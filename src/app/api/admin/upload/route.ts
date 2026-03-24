import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/gif", "image/webp"];
const MAX_SIZE = 5 * 1024 * 1024; // 5 MB

// Validate actual file magic bytes (not just client-provided MIME type)
function validateMagicBytes(buf: Buffer, mimeType: string): boolean {
  if (mimeType === "image/jpeg")
    return buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff;
  if (mimeType === "image/png")
    return (
      buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e &&
      buf[3] === 0x47 && buf[4] === 0x0d && buf[5] === 0x0a
    );
  if (mimeType === "image/gif")
    return buf[0] === 0x47 && buf[1] === 0x49 && buf[2] === 0x46;
  if (mimeType === "image/webp")
    return (
      buf[0] === 0x52 && buf[1] === 0x49 && buf[2] === 0x46 && buf[3] === 0x46 &&
      buf[8] === 0x57 && buf[9] === 0x45 && buf[10] === 0x42 && buf[11] === 0x50
    );
  return false;
}

export async function POST(req: NextRequest) {
  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
  }

  const file = formData.get("file");
  if (!file || !(file instanceof File)) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json(
      { error: "Invalid file type. Only JPEG, PNG, GIF, and WebP are allowed." },
      { status: 400 }
    );
  }

  if (file.size > MAX_SIZE) {
    return NextResponse.json(
      { error: "File too large. Maximum size is 5 MB." },
      { status: 400 }
    );
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Validate actual file content, not just the client-provided MIME header
  if (!validateMagicBytes(buffer, file.type)) {
    return NextResponse.json(
      { error: "File content does not match the declared image type." },
      { status: 400 }
    );
  }

  // Derive a safe extension from the validated MIME type
  const mimeToExt: Record<string, string> = {
    "image/jpeg": ".jpg",
    "image/png": ".png",
    "image/gif": ".gif",
    "image/webp": ".webp",
  };
  const ext = mimeToExt[file.type] ?? ".bin";

  // Build a collision-resistant, filesystem-safe filename (no user input in path)
  const safeName = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}${ext}`;

  const uploadDir = path.join(process.cwd(), "public", "assets", "uploads");
  await mkdir(uploadDir, { recursive: true });

  await writeFile(path.join(uploadDir, safeName), buffer);

  return NextResponse.json({ url: `/assets/uploads/${safeName}` });
}

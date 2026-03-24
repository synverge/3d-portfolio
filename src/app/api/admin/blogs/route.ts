import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import matter from "gray-matter";

const BLOGS_DIR = path.join(process.cwd(), "src", "content", "blogs");

export async function GET() {
  try {
    await fs.mkdir(BLOGS_DIR, { recursive: true });
    const files = await fs.readdir(BLOGS_DIR);
    const blogs = await Promise.all(
      files
        .filter((f) => f.endsWith(".mdx"))
        .map(async (file) => {
          const slug = file.replace(".mdx", "");
          const raw = await fs.readFile(path.join(BLOGS_DIR, file), "utf-8");
          const { data, content } = matter(raw);
          return { slug, frontmatter: JSON.parse(JSON.stringify(data)), content };
        })
    );
    return NextResponse.json(blogs);
  } catch {
    return NextResponse.json(
      { error: "Failed to list blogs" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { slug, frontmatter, content } = await req.json();

    if (!slug || !/^[a-z0-9-]+$/.test(slug)) {
      return NextResponse.json({ error: "Invalid slug" }, { status: 400 });
    }

    const filePath = path.join(BLOGS_DIR, `${slug}.mdx`);
    // Prevent overwriting existing files via POST
    try {
      await fs.access(filePath);
      return NextResponse.json(
        { error: "Blog with this slug already exists" },
        { status: 409 }
      );
    } catch {
      // File doesn't exist — safe to create
    }

    const fileContent = matter.stringify(content ?? "", frontmatter ?? {});
    await fs.writeFile(filePath, fileContent, "utf-8");
    return NextResponse.json({ success: true, slug });
  } catch {
    return NextResponse.json(
      { error: "Failed to create blog" },
      { status: 500 }
    );
  }
}

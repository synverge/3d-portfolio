import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import matter from "gray-matter";

const BLOGS_DIR = path.join(process.cwd(), "src", "content", "blogs");

function safeSlug(slug: string): boolean {
  return /^[a-z0-9-]+$/.test(slug);
}

export async function GET(
  _: NextRequest,
  { params }: { params: { slug: string } }
) {
  if (!safeSlug(params.slug)) {
    return NextResponse.json({ error: "Invalid slug" }, { status: 400 });
  }
  try {
    const filePath = path.join(BLOGS_DIR, `${params.slug}.mdx`);
    const raw = await fs.readFile(filePath, "utf-8");
    const { data, content } = matter(raw);
    return NextResponse.json({ slug: params.slug, frontmatter: data, content });
  } catch {
    return NextResponse.json({ error: "Blog not found" }, { status: 404 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  if (!safeSlug(params.slug)) {
    return NextResponse.json({ error: "Invalid slug" }, { status: 400 });
  }
  try {
    const { frontmatter, content } = await req.json();
    const filePath = path.join(BLOGS_DIR, `${params.slug}.mdx`);
    // Ensure the blog exists before allowing updates
    try {
      await fs.access(filePath);
    } catch {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }
    const fileContent = matter.stringify(content ?? "", frontmatter ?? {});
    await fs.writeFile(filePath, fileContent, "utf-8");
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to update blog" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _: NextRequest,
  { params }: { params: { slug: string } }
) {
  if (!safeSlug(params.slug)) {
    return NextResponse.json({ error: "Invalid slug" }, { status: 400 });
  }
  try {
    const filePath = path.join(BLOGS_DIR, `${params.slug}.mdx`);
    await fs.unlink(filePath);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to delete blog" },
      { status: 500 }
    );
  }
}

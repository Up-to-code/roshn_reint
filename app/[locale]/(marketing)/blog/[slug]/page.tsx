import { Metadata } from "next";
import { notFound } from "next/navigation";
import ShareButton from "./ShareButton";

// Mock data (replace with API or DB later)
const blogPosts = [
  {
    id: 1,
    title: "Getting Started with Next.js",
    author: "John Doe",
    date: "2024-03-15",
    content: `Next.js is a powerful React framework that enables you to build fast, SEO-friendly web applications.

It provides features like server-side rendering, static site generation, and API routes out of the box.`,
    excerpt: "Learn the basics of Next.js and start building modern web applications.",
    tags: ["Next.js", "React", "Web Development"],
  },
  {
    id: 2,
    title: "TypeScript Best Practices",
    author: "Jane Smith",
    date: "2024-03-10",
    content: `TypeScript adds static typing to JavaScript, making your code more robust and maintainable.

Here are some best practices to follow when writing TypeScript code.`,
    excerpt: "Discover best practices for writing clean TypeScript code.",
    tags: ["TypeScript", "JavaScript", "Best Practices"],
  },
  {
    id: 3,
    title: "Building Scalable APIs",
    author: "Mike Johnson",
    date: "2024-03-05",
    content: `Learn how to build scalable and maintainable REST APIs using modern best practices and design patterns.

A comprehensive guide to API development.`,
    excerpt: "A comprehensive guide to API development.",
    tags: ["API", "Backend", "Architecture"],
  },
];

interface PageProps {
  params: {
    slug: string;
  };
}

// ✅ Generate static params
export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.id.toString(),
  }));
}

// ✅ Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const postId = parseInt(params.slug);
  const post = blogPosts.find((p) => p.id === postId);

  if (!post) return { title: "Post Not Found" };

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}

async function getPost(id: number) {
  return blogPosts.find((post) => post.id === id);
}

// ✅ Main Article Page
export default async function BlogPostPage({ params }: PageProps) {
  const postId = parseInt(params.slug);

  if (isNaN(postId)) notFound();

  const post = await getPost(postId);
  if (!post) notFound();

  return (
    <article className="mx-auto max-w-4xl px-4 py-12">
      {/* Article Header */}
      <header className="mb-8">
        <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-gray-100">
          {post.title}
        </h1>

        <div className="mb-4 flex items-center gap-4 text-gray-600 dark:text-gray-400">
          <span>By {post.author}</span>
          <span>•</span>
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
        </div>

        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800 dark:bg-blue-900 dark:text-blue-200"
            >
              {tag}
            </span>
          ))}
        </div>
      </header>

      {/* Article Content */}
      <div className="prose prose-lg max-w-none dark:prose-invert">
        {post.content.split("\n\n").map((paragraph, index) => (
          <p key={index} className="mb-4 text-gray-700 dark:text-gray-300">
            {paragraph}
          </p>
        ))}
      </div>

      {/* Footer with navigation + share */}
      <footer className="mt-12 border-t border-gray-200 pt-8 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <a
            href="/blog"
            className="text-blue-600 transition-colors hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
          >
            ← Back to Blog
          </a>

          <ShareButton title={post.title} />
        </div>
      </footer>
    </article>
  );
}

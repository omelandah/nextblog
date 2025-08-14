import Link from 'next/link';
import { mockPosts } from '../page';

interface BlogDetailProps {
  params: Promise<{ slug: number }>;
}

const BlogDetail = async ({ params }: BlogDetailProps) => {
  const data = await params;

  const post = mockPosts.find((p) => p.id === Number(data.slug));

  if (!post) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold text-red-500">Post not found</h1>
      </div>
    );
  }

  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <header className="mb-6">
        <h1 className="text-4xl font-bold mb-2">{post.title}</h1>
        <p className="text-gray-500 text-sm">
          {new Date(post.date).toLocaleDateString()}
        </p>
      </header>

      <article className="prose prose-lg max-w-none">
        {post.body.split('\n\n').map((paragraph, idx) => (
          <p key={idx}>{paragraph}</p>
        ))}
      </article>

      <div className="mt-8">
        <Link href="/" className="text-blue-500 hover:underline font-medium">
          ← Back to Home
        </Link>
      </div>
    </main>
  );
};

export default BlogDetail;

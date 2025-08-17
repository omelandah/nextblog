import { getAxiosServer } from '@/lib/axiosServer';
import { BlogPost } from '@/models/blog';
import { getPostById } from '@/services/blog';
import Link from 'next/link';

interface BlogDetailProps {
  params: Promise<{ slug: string }>;
}

const BlogDetail = async ({ params }: BlogDetailProps) => {
  const { slug } = await params;
  const axios = await getAxiosServer();
  const currentPost = await getPostById(axios, slug as string);

  if (!currentPost) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold text-red-500">Post not found</h1>
      </div>
    );
  }

  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <header className="mb-6">
        <h1 className="text-4xl font-bold mb-2">{currentPost.title}</h1>
        <p className="text-gray-500 text-sm">
          {currentPost.date} by {currentPost.author?.username}
        </p>
      </header>

      <article className="prose prose-lg max-w-none">
        {currentPost.body
          .split('\n\n')
          .map((paragraph: string, idx: number) => (
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

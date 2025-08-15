'use client';

import { BlogPost } from '@/models/blog';
import { getPostById } from '@/services/blog';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const BlogDetail = () => {
  const { slug } = useParams();
  const [currentPost, setCurrentPost] = useState<BlogPost | null>(null);

  const fetchPostById = async () => {
    const data = await getPostById(slug as string);

    setCurrentPost(data);
  };

  useEffect(() => {
    fetchPostById();
  }, [slug]);

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
        {currentPost.body.split('\n\n').map((paragraph, idx) => (
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

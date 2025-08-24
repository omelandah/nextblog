import { getAxiosServer } from '@/lib/axiosServer';
import { getTranslation } from '@/lib/getTranslation';
import { BlogPost } from '@/models/blog';
import { getPostById } from '@/services/blog';
import { headers } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';

interface BlogDetailProps {
  params: Promise<{ slug: string }>;
}

const BlogDetail = async ({ params }: BlogDetailProps) => {
  const header = await headers();
  const locale = header.get('x-locale') || 'en';
  const { t } = await getTranslation(locale, 'common');

  const { slug } = await params;
  const axios = await getAxiosServer();
  const currentPost = await getPostById(axios, slug as string);

  if (!currentPost) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold text-red-500">
          {t('blog.detail.notFound')}
        </h1>
      </div>
    );
  }

  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      {currentPost.coverImage && (
        <div className="mb-3">
          <Image
            src={currentPost.coverImage}
            alt="Cover Image"
            className="w-full object-cover rounded border"
          />
        </div>
      )}

      <header className="mb-6">
        <h1 className="text-4xl font-bold mb-2">{currentPost.title}</h1>
        <p className="text-gray-500 text-sm">
          {currentPost.date} {t('blog.card.by')} {currentPost.author?.username}
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
          ← {t('blog.detail.back')}
        </Link>
      </div>
    </main>
  );
};

export default BlogDetail;

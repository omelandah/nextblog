import { BlogPost } from '@/models/blog';
import { getAllPosts, deletePost } from '@/services/blog';
import Link from 'next/link';
import { revalidatePath } from 'next/cache';
import { getServerAuthUser } from '@/lib/auth';
import { getAxiosServer } from '@/lib/axiosServer';
import { headers } from 'next/headers';
import { getTranslation } from '@/lib/getTranslation';

// ✅ Server Action for deleting
async function handleDeletePost(id: string) {
  'use server';

  const axios = await getAxiosServer();
  await deletePost(axios, id);
  revalidatePath('/blogs');
}

const BlogList = async () => {
  const header = await headers();
  const locale = header.get('x-locale') || 'en';
  const { t } = await getTranslation(locale, 'common');

  // ✅ fetch posts directly on the server
  const axios = await getAxiosServer();
  const posts: BlogPost[] = (await getAllPosts(axios)) || [];
  const currentUser = await getServerAuthUser(); // replace with your server-side auth check

  const checkEditable = (post: BlogPost) => {
    return post.author.id === currentUser?.id || currentUser?.isAdmin;
  };

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-2">{t('blog.home.title')}</h1>
        <p className="text-gray-600">{t('blog.home.description')}</p>
      </header>

      <div className="flex justify-end mb-4">
        <Link
          href="/blogs/create"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {t('blog.button.create')}
        </Link>
      </div>

      <section className="space-y-6">
        {posts.map((post: BlogPost) => (
          <article
            key={post.id}
            className="p-6 border rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white"
          >
            <h2 className="text-black text-2xl font-semibold mb-2">
              {post.title}
            </h2>
            <p className="text-gray-500 text-sm mb-4">
              {post.date} {t('blog.card.by')} {post.author.username}
            </p>
            <p className="text-gray-700 mb-4 line-clamp-2">{post.body}</p>
            <Link
              href={`/blogs/${post.id}`}
              className="text-blue-500 hover:underline font-medium"
            >
              {t('blog.card.readMore')} →
            </Link>

            {checkEditable(post) && (
              <div className="mt-3 flex items-center justify-end">
                <Link
                  href={`/blogs/${post.id}/edit`}
                  className="text-blue-500 hover:underline text-sm"
                >
                  {t('blog.button.edit')}
                </Link>

                <form action={handleDeletePost.bind(null, post.id)}>
                  <button
                    type="submit"
                    className="text-red-500 ml-4 cursor-pointer hover:underline text-sm"
                  >
                    {t('blog.button.delete')}
                  </button>
                </form>
              </div>
            )}
          </article>
        ))}
      </section>
    </main>
  );
};

export default BlogList;

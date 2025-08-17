import { BlogPost } from '@/models/blog';
import { getAllPosts, deletePost } from '@/services/blog';
import { useAuthStore } from '@/store/useAuthStore';
import Link from 'next/link';
import { revalidatePath } from 'next/cache';
import { getServerAuthUser } from '@/lib/auth';
import { getAxiosServer } from '@/lib/axiosServer';

// ✅ Server Action for deleting
async function handleDeletePost(id: string) {
  'use server';

  const axios = await getAxiosServer();
  await deletePost(axios, id);
  revalidatePath('/blogs');
}

const BlogList = async () => {
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
        <h1 className="text-4xl font-bold mb-2">My Blog</h1>
        <p className="text-gray-600">Sharing my thoughts and experiences</p>
      </header>

      <div className="flex justify-end mb-4">
        <Link
          href="/blogs/create"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Create New Blog
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
              {post.date} by {post.author.username}
            </p>
            <p className="text-gray-700 mb-4 line-clamp-2">{post.body}</p>
            <Link
              href={`/blogs/${post.id}`}
              className="text-blue-500 hover:underline font-medium"
            >
              Read More →
            </Link>

            {checkEditable(post) && (
              <div className="mt-3 flex items-center justify-end">
                <Link
                  href={`/blogs/${post.id}/edit`}
                  className="text-blue-500 hover:underline text-sm"
                >
                  Edit
                </Link>

                <form action={handleDeletePost.bind(null, post.id)}>
                  <button
                    type="submit"
                    className="text-red-500 ml-4 cursor-pointer hover:underline text-sm"
                  >
                    Delete
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

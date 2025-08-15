'use client';

import BlogForm from '@/components/FormBlog/index';
import { createPost, FormBlog } from '@/services/blog';
import { useRouter } from 'next/navigation';

export default function CreatePostPage() {
  const router = useRouter();

  const handleCreate = async (values: FormBlog) => {
    console.log('Creating post:', values);
    // TODO: Call API to create post
    const res = await createPost(values);
    if (res) {
      router.push('/blogs');
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-6">
      <BlogForm onSubmit={handleCreate} submitLabel="Create" />
    </div>
  );
}

import BlogForm from '@/components/FormBlog/index';
import { getAxiosServer } from '@/lib/axiosServer';
import { createPost } from '@/services/blog';
import { redirect } from 'next/navigation';

export default function CreatePostPage() {
  const handleCreate = async (formData: FormData) => {
    'use server';
    // TODO: Call API to create post
    const title = formData.get('title') as string;
    const body = formData.get('body') as string;

    const axios = await getAxiosServer();
    const res = await createPost(axios, { title, body });
    if (res) {
      redirect('/blogs');
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-6">
      <BlogForm onSubmit={handleCreate} submitLabel="Create" />
    </div>
  );
}

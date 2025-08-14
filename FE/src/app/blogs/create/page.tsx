'use client';

import BlogForm from '@/components/FormBlog/index';
import { useRouter } from 'next/navigation';

export default function CreatePostPage() {
  const router = useRouter();

  const handleCreate = (values: { title: string; body: string }) => {
    console.log('Creating post:', values);
    // TODO: Call API to create post
    router.push('/'); // redirect to home after creation
  };

  return (
    <div className="max-w-3xl mx-auto py-6">
      <BlogForm onSubmit={handleCreate} submitLabel="Create" />
    </div>
  );
}

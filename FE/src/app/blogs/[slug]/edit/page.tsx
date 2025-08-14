'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import BlogForm from '@/components/FormBlog/index';

export default function EditPostPage() {
  const { id } = useParams();
  const router = useRouter();
  const [initialData, setInitialData] = useState<{
    title: string;
    body: string;
  } | null>(null);

  useEffect(() => {
    // TODO: Fetch post by id
    setInitialData({
      title: 'Sample Post Title',
      body: 'Sample post content here...',
    });
  }, [id]);

  const handleUpdate = (values: { title: string; body: string }) => {
    console.log('Updating post:', id, values);
    // TODO: Call API to update post
    router.push(`/posts/${id}`);
  };

  if (!initialData) return <p className="text-center py-6">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto py-6">
      <BlogForm
        initialValues={initialData}
        onSubmit={handleUpdate}
        submitLabel="Update"
      />
    </div>
  );
}

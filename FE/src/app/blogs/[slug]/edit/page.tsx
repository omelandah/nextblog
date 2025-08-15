'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import BlogForm from '@/components/FormBlog/index';
import { FormBlog, getPostById, updatePost } from '@/services/blog';
import { BlogPost } from '@/models/blog';

export default function EditPostPage() {
  const { slug } = useParams();
  const router = useRouter();
  const [initialData, setInitialData] = useState<FormBlog | null>(null);

  const fetchPostById = async () => {
    const data = await getPostById(slug as string);
    setInitialData({
      title: data.title,
      body: data.body,
    });
  };

  useEffect(() => {
    if (slug) {
      fetchPostById();
    }
  }, [slug]);

  const handleUpdate = async (values: FormBlog) => {
    console.log('🚀 ~ handleUpdate ~ values:', values);
    const res = await updatePost(slug as string, values);

    if (res) {
      router.push(`/blogs/${slug}`);
    }
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

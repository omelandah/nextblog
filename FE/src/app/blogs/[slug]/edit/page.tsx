import { redirect } from 'next/navigation';
import BlogForm from '@/components/FormBlog/index';
import { getPostById, updatePost } from '@/services/blog';
import { getAxiosServer } from '@/lib/axiosServer';

interface EditPostPageProps {
  params: Promise<{ slug: string }>;
}

export default async function EditPostPage({ params }: EditPostPageProps) {
  const { slug } = await params;
  const axios = await getAxiosServer();
  const data = await getPostById(axios, slug as string);
  const initialData = {
    title: data.title,
    body: data.body,
    coverImage: data.coverImage,
  };

  const handleUpdate = async (formData: FormData) => {
    'use server';
    const axios = await getAxiosServer();

    const fd = new FormData();

    const title = formData.get('title') as string;
    const body = formData.get('body') as string;
    const coverImage = formData.get('coverImage') as File | null;

    fd.append('title', title);
    fd.append('body', body);

    if (coverImage && coverImage.size > 0 && coverImage.name !== 'undefined') {
      fd.append('coverImage', coverImage);
    }

    const res = await updatePost(axios, slug as string, fd);

    if (res) {
      redirect(`/blogs/${slug}`);
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

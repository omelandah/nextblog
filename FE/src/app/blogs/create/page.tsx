import BlogForm from '@/components/FormBlog/index';
import { getAxiosServer } from '@/lib/axiosServer';
import { getTranslation } from '@/lib/getTranslation';
import { createPost } from '@/services/blog';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function CreatePostPage() {
  const header = await headers();
  const locale = header.get('x-locale') || 'en';
  const { t } = await getTranslation(locale, 'common');

  const handleCreate = async (formData: FormData) => {
    'use server';
    // TODO: Call API to create post
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
    const res = await createPost(axios, fd);
    if (res) {
      redirect('/blogs');
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-6">
      <BlogForm onSubmit={handleCreate} submitLabel="Create" translation={t} />
    </div>
  );
}

import { getTranslation } from '@/lib/getTranslation';
import { headers } from 'next/headers';
import ImageUpload from '../ImageUpload';

interface BlogFormProps {
  initialValues?: {
    title: string;
    body: string;
    coverImage?: string;
  };
  onSubmit: (formData: FormData) => Promise<void>;
  submitLabel?: string;
  translation: (key: string) => string;
}

export default function BlogForm({
  initialValues = { title: '', body: '', coverImage: '' },
  onSubmit,
  submitLabel = 'Save',
  translation,
}: BlogFormProps) {
  return (
    <form
      action={onSubmit}
      className="space-y-4 border rounded px-6 py-6 shadow"
      // encType="multipart/form-data"
    >
      <h2 className="text-2xl font-semibold">
        {submitLabel === 'Create'
          ? translation('blog.create.title')
          : translation('blog.edit.title')}
      </h2>

      {/* Cover Image */}
      <ImageUpload
        initialUrl={initialValues.coverImage}
        label={translation('blog.form.coverImage')}
      />

      {/* Title */}
      <div>
        <label className="block font-medium mb-1" htmlFor="title">
          {translation('blog.form.title')}
        </label>
        <input
          id="title"
          name="title"
          type="text"
          defaultValue={initialValues.title}
          placeholder={translation('blog.form.title.placeholder')}
          className="border rounded px-3 py-2 w-full"
        />
      </div>

      {/* Body */}
      <div>
        <label className="block font-medium mb-1" htmlFor="body">
          {translation('blog.form.body')}
        </label>
        <textarea
          id="body"
          name="body"
          defaultValue={initialValues.body}
          placeholder={translation('blog.form.body.placeholder')}
          rows={5}
          className="border rounded px-3 py-2 w-full"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        {submitLabel === 'Create'
          ? translation('button.create')
          : translation('button.update')}
      </button>
    </form>
  );
}

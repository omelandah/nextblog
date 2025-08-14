'use client';

import { useState } from 'react';

interface BlogFormProps {
  initialValues?: {
    title: string;
    body: string;
  };
  onSubmit: (values: { title: string; body: string }) => void;
  submitLabel?: string;
}

export default function BlogForm({
  initialValues = { title: '', body: '' },
  onSubmit,
  submitLabel = 'Save',
}: BlogFormProps) {
  const [formData, setFormData] = useState(initialValues);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 border rounded px-6 py-6 shadow"
    >
      <h2 className="text-2xl font-semibold">
        {submitLabel === 'Create' ? 'Create New Post' : 'Edit Post'}
      </h2>

      {/* Title */}
      <div>
        <label className="block font-medium mb-1" htmlFor="title">
          Title
        </label>
        <input
          id="title"
          name="title"
          type="text"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter post title..."
          className="border rounded px-3 py-2 w-full"
        />
      </div>

      {/* Body */}
      <div>
        <label className="block font-medium mb-1" htmlFor="body">
          Body
        </label>
        <textarea
          id="body"
          name="body"
          value={formData.body}
          onChange={handleChange}
          placeholder="Write your post..."
          rows={5}
          className="border rounded px-3 py-2 w-full"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        {submitLabel}
      </button>
    </form>
  );
}

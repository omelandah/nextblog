'use client';
import { useState, ChangeEvent } from 'react';

interface ImageUploadProps {
  initialUrl?: string;
  label: string;
}

export default function ImageUpload({ initialUrl, label }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(initialUrl || null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div>
      <label className="block font-medium mb-1" htmlFor="coverImage">
        {label}
      </label>
      <input
        id="coverImage"
        name="coverImage"
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="block w-full text-sm text-gray-700
                   file:mr-4 file:py-2 file:px-4
                   file:rounded-full file:border-0
                   file:text-sm file:font-semibold
                   file:bg-blue-50 file:text-blue-700
                   hover:file:bg-blue-100"
      />

      {preview && (
        <div className="mt-3">
          <img
            src={preview}
            alt="Cover preview"
            className="w-full object-cover rounded border"
          />
        </div>
      )}
    </div>
  );
}

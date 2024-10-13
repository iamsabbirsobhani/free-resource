'use client';

import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import {
  S3Client,
  PutObjectCommand,
  ObjectCannedACL,
} from '@aws-sdk/client-s3';
import { useRouter } from 'next/navigation';

interface data {
  id: string;
  title: string;
  description: string;
  recommendedUse: string;
  imageUrl: string;
  fileUrl: string;
  updatedAt: string;
}

interface FormData {
  title: string;
  description: string;
  recommendedUse: string;
  imageUrl: string;
  fileUrl: string;
  image: File | null;
  file: File | null;
}

export default function UpdateClient({ prevData }: { prevData: data }) {
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    title: prevData.title || '',
    description: prevData.description || '',
    recommendedUse: prevData.recommendedUse || '',
    imageUrl: prevData.imageUrl || '',
    fileUrl: prevData.fileUrl || '',
    image: null,
    file: null,
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && localStorage.getItem('id')) {
      setIsAuthorized(true);
    }
  }, []);

  const r2Client = new S3Client({
    endpoint: process.env.NEXT_PUBLIC_CLOUDFLARE_R2_ENDPOINT,
    region: process.env.NEXT_PUBLIC_CLOUDFLARE_R2_REGION || 'auto',
    credentials: {
      accessKeyId: process.env.NEXT_PUBLIC_CLOUDFLARE_ACCESS_KEY_ID!,
      secretAccessKey: process.env.NEXT_PUBLIC_CLOUDFLARE_SECRET_ACCESS_KEY!,
    },
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { id, value } = e.target;

    if (e.target instanceof HTMLInputElement && e.target.type === 'file') {
      const file = e.target.files ? e.target.files[0] : null;
      setFormData((prev) => ({
        ...prev,
        [id]: file,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [id]: value,
      }));
    }
  };

  const uploadToCloudflareR2 = async (
    file: File,
    bucketName: string,
    folder: string,
    type: string,
  ) => {
    if (!file) throw new Error(`${type} file is missing`);

    const params = {
      Bucket: bucketName,
      Key: `${folder}/${file.name}`,
      Body: file,
      ContentType: file.type,
      ACL: ObjectCannedACL.public_read,
    };

    try {
      const command = new PutObjectCommand(params);
      const response = await r2Client.send(command);
      console.log(`${type} uploaded successfully to R2:`, response);
      return `${process.env.NEXT_PUBLIC_CLOUDFLARE_PUBLIC_BUCKET_URL}/${folder}/${file.name}`;
    } catch (error) {
      throw new Error(`Error uploading ${type} to Cloudflare R2: ${error}`);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);
    setLoading(true);

    try {
      let imageUrl = formData.imageUrl;
      let fileUrl = formData.fileUrl;

      if (formData.image) {
        imageUrl = await uploadToCloudflareR2(
          formData.image,
          'tree-shop',
          'showcase',
          'image',
        );
      }
      if (formData.file) {
        fileUrl = await uploadToCloudflareR2(
          formData.file,
          'tree-shop',
          'digitalproducts',
          'file',
        );
      }

      const response = await fetch(`/api/resource/update/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: prevData.id,
          title: formData.title,
          description: formData.description,
          recommendedUse: formData.recommendedUse,
          imageUrl,
          fileUrl,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to update resource: ${response.statusText}`);
      }

      setSuccessMessage('Resource updated successfully!');
      const responseData = await response.json();
      router.push(`/resource/single/${responseData.resource.id}`); // Redirect after successful update
    } catch (error) {
      console.error('Error submitting the form:', error);
      setErrorMessage(
        'There was an error updating the resource. Please try again.',
      );
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthorized) {
    return (
      <div className="flex justify-center items-center h-screen p-2">
        <h1 className="text-3xl">You are not authorized to view this page</h1>
      </div>
    );
  }

  return (
    <div className="max-w-80 m-auto">
      <div className="text-center mt-3 mb-3">
        <h1 className="font-bold text-xl">Update The Resource</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            placeholder="Enter the title of the resource..."
            className="mt-2 p-2 font-light rounded-md outline-1 outline-violet-500 outline-offset-4 border"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex flex-col mt-2">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            placeholder="Enter the description of the resource..."
            className="mt-2 p-2 font-light rounded-md outline-1 outline-violet-500 outline-offset-4 border"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div className="flex flex-col mt-2">
          <label htmlFor="recommendedUse">Recommended Use</label>
          <textarea
            id="recommendedUse"
            placeholder="Enter the recommended use of the resource..."
            className="mt-2 p-2 font-light rounded-md outline-1 outline-violet-500 outline-offset-4 border"
            value={formData.recommendedUse}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="flex flex-col mt-2">
          <label htmlFor="image">Image (Optional)</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            className="mt-2 p-2 font-light rounded-md outline-1 outline-violet-500 outline-offset-4 border"
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col mt-2">
          <label htmlFor="file">File (PDF, Excel, Docs) (Optional)</label>
          <input
            type="file"
            id="file"
            accept=".pdf,.doc,.docx,.xls,.xlsx"
            className="mt-2 p-2 font-light rounded-md outline-1 outline-violet-500 outline-offset-4 border"
            onChange={handleChange}
          />
        </div>

        {errorMessage && (
          <div className="text-red-500 mt-2">{errorMessage}</div>
        )}
        {successMessage && (
          <div className="text-green-500 mt-2">{successMessage}</div>
        )}

        <div>
          <button
            className="mt-5 bg-violet-500 text-white p-2 rounded-md w-full"
            type="submit"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Update resource'}
          </button>
        </div>
      </form>
    </div>
  );
}

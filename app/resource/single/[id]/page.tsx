import Image from 'next/image';
import { Metadata } from 'next';
const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

interface SingleResourceProps {
  params: {
    id: string;
  };
}

const getResource = async (id: string) => {
  try {
    const response = await fetch(`${baseUrl}/api/resource/getresource/`, {
      method: 'POST',
      cache: 'no-store',
      next: { revalidate: 10 },
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        Pragma: 'no-cache',
        Expires: '0',
      },
      body: JSON.stringify({ id }),
    });
    if (!response.ok) {
      throw new Error(`Failed to retrieve resource: ${response.statusText}`);
    }
    const data = await response.json();
    return data.resource;
  } catch (error) {
    console.error('Error retrieving resource:', error);
    return null;
  }
};

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = params.id;

  const product = await getResource(id);

  if (!product) {
    return {
      title: 'Resource not found',
    };
  }

  return {
    title: product.title,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      images: [
        {
          url: product.imageUrl,
          width: 800,
          height: 600,
          alt: product.title,
        },
      ],
    },
  };
}

export default async function SingleResource({ params }: SingleResourceProps) {
  const { id } = params;
  const resource = await getResource(id);

  return (
    <div className="max-w-6xl m-auto p-2">
      <div className="mb-3">
        <h1 className="text-2xl font-bold text-gray-700 border-b-2 border-amber-400">
          {resource.title}
        </h1>
      </div>

      <div className="w-fit m-auto mt-3 mb-3">
        <Image
          src={resource.imageUrl}
          alt={resource.title}
          width={600}
          height={500}
          className="rounded-lg"
        />
      </div>
      <div className="mt-3">
        <h1 className="text-xl font-bold border-b-2 border-amber-400 text-gray-700">
          Descriptions:
        </h1>
        <p className="mt-3 mb-3">{resource.description}</p>
      </div>
      <div>
        <h1 className="border-b-2 border-amber-400 text-xl font-bold text-gray-700">
          Recommended use:
        </h1>
        <p className="mt-3 mb-3">{resource.recommendedUse}</p>
      </div>
      <div className="w-fit m-auto">
        <a
          href={resource.fileUrl}
          download
          className="m-auto mt-5 bg-gradient-to-r from-violet-500 to-indigo-600 hover:from-indigo-600 hover:to-violet-500 transition-all duration-300 text-xs rounded-md text-white p-2 mb-3 w-52"
        >
          Download
        </a>
      </div>
    </div>
  );
}

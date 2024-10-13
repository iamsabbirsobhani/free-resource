import UpdateClient from './update-client-page';

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

interface SingleResourceProps {
  params: {
    id: string;
  };
}

const previousData = async (id: string) => {
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

export default async function Update({ params }: SingleResourceProps) {
  const { id } = params;
  const data = await previousData(id);
  return (
    <div>
      <UpdateClient prevData={data} />
    </div>
  );
}

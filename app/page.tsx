import ProductCard from '@/components/ProductCard';
const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
type Resource = {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  fileUrl: string;
};
export const dynamic = 'force-dynamic';

const getResources = async (): Promise<Resource[]> => {
  try {
    const response = await fetch(`${baseUrl}/api/resource/getresources`, {
      cache: 'no-store',
      next: { revalidate: 10 },
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        Pragma: 'no-cache',
        Expires: '0',
      },
    });
    if (!response.ok) {
      throw new Error(`Failed to retrieve resources: ${response.statusText}`);
    }
    const data = await response.json();
    return data.resources;
  } catch (error) {
    console.error('Error retrieving resources:', error);
    return [];
  }
};

export default async function Home() {
  const resources = await getResources();

  if (!resources) {
    return <div>No resources found</div>;
  }

  return (
    <div className="max-w-7xl m-auto">
      <main className="">
        <section className="products grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5 justify-items-center">
          {resources.map((product, index) => (
            <ProductCard
              key={index}
              imgURL={product.imageUrl}
              productTitle={product.title}
              descriptionSynopsis={product.description}
              downloadLink={product.fileUrl}
              productId={product.id}
            />
          ))}
        </section>
      </main>
    </div>
  );
}

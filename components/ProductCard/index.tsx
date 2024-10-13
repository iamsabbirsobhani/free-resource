import Image from 'next/image';
import ClientProductCard from './client-product-card';

export default function ProductCard({
  imgURL,
  productTitle,
  descriptionSynopsis,
  downloadLink,
  productId,
}: {
  imgURL: string;
  productTitle: string;
  descriptionSynopsis: string;
  downloadLink: string;
  productId: number;
}) {
  return (
    <div className="border-2 border-amber-300 m-2 max-w-80 h-fit rounded-lg overflow-hidden shadow-md text-gray-600">
      <div>
        <Image src={imgURL} alt={productTitle} width={400} height={300} />
      </div>
      <ClientProductCard productId={productId} productTitle={productTitle} />
      <p className="text-sm m-2 font-light text-ellipsis line-clamp-4">
        {descriptionSynopsis}
      </p>
      <a href={downloadLink} className="m-2 ">
        <button className="bg-gradient-to-r from-violet-500 to-indigo-600 hover:from-indigo-600 hover:to-violet-500 transition-all duration-300 text-xs rounded-md text-white p-2 mb-3">
          Download PDF
        </button>
      </a>
    </div>
  );
}

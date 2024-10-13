'use client';

import { Linkn } from '../Linkn';

export default function ClientProductCard({
  productId,
  productTitle,
}: {
  productId: number;
  productTitle: string;
}) {
  return (
    <Linkn href={`/resource/single/${productId}`}>
      <h1 className="overflow-ellipsis line-clamp-2 cursor-pointer text-xl p-2 font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-500 via-indigo-500 to-purple-500 mt-4">
        {productTitle}
      </h1>
    </Linkn>
  );
}

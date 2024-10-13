'use client';

import Link from 'next/link';

export default function Title() {
  return (
    <Link href="/">
      <h1 className="text-2xl text-gray-700 font-extrabold">
        Free <span className="text-violet-500">Resources</span>
      </h1>
    </Link>
  );
}

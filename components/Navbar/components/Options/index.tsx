'use client';

import { useState } from 'react';
import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Options() {
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setShowOptions(false);
    console.log('pathname', pathname);
    const id = localStorage.getItem('id');
    setIsLoggedIn(!!id);
  }, [pathname]);
  return (
    <div className="relative">
      <div
        className="relative cursor-pointer"
        onClick={() => {
          setShowOptions(!showOptions);
        }}
      >
        <div className="w-5 h-[1px] bg-gray-700 ml-auto mr-0"></div>
        <div className="w-4 h-[1px] mt-1 bg-gray-700 ml-auto mr-0"></div>
      </div>
      <div className="">
        <div
          className={`absolute right-0 w-64 backdrop-blur-md rounded-br-md rounded-bl-md border-l border-b border-r p-3 top-3 z-20 ${
            showOptions ? 'block' : 'hidden'
          }`}
        >
          <ul className="text-gray-900">
            {isLoggedIn ? (
              <>
                <li className="">
                  <Link href="/">
                    <button className="font-bold p-2 rounded-md w-full text-left duration-300 transition-all bg-gray-50/80 hover:bg-gray-50 mt-3">
                      Home
                    </button>
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard">
                    <button className="font-bold p-2 rounded-md w-full text-left duration-300 transition-all bg-gray-50/80 hover:bg-gray-50 mt-3">
                      Dashboard
                    </button>
                  </Link>
                </li>
              </>
            ) : (
              <li>
                <Link href="/login">
                  <button className="font-bold p-2 rounded-md w-full text-left duration-300 transition-all bg-gray-50/80 hover:bg-gray-50 mt-3">
                    Login
                  </button>
                </Link>
              </li>
            )}
            <li className="">
              {isLoggedIn ? (
                <Link href="/">
                  <button
                    className="font-bold p-2 rounded-md w-full text-left duration-300 transition-all bg-gray-50/80 hover:bg-gray-50 mt-3"
                    onClick={() => {
                      localStorage.removeItem('id');
                      localStorage.removeItem('token');
                      router.push('/');
                      if (pathname === '/') {
                        window.location.reload();
                      }
                    }}
                  >
                    Logout
                  </button>
                </Link>
              ) : (
                <Link href="/signup">
                  <button className="font-bold p-2 rounded-md w-full text-left duration-300 transition-all bg-gray-50/80 hover:bg-gray-50 mt-3">
                    Sign up
                  </button>
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

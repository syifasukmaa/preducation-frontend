'use client';
import React from 'react';
import { useSession } from 'next-auth/react';
import DarkModeButton from '../button/DarkModeButton';

export default function Navbar() {
  const { data: session } = useSession();
  const name = session?.user?.name;
  return (
    <nav className="flex items-center justify-between px-4 py-5 shadow-md bg-neutral-01 md:px-12 text-dark-blue-05 dark:bg-dark-grey-04">
      <div className="font-bold text-center text-primary-dark-blue xl:text-2xl md:text-xl dark:text-[#A8A6A5]">
        Hi, {name}!
      </div>
      <div className="flex items-center justify-between lg:justify-end">
        <div className="flex flex-col items-center justify-center px-1 py-1 text-2xl text-white dark:bg-orange-06 rounded-2xl md:py-3 md:px-4 bg-orange-05 hover:scale-95">
          <DarkModeButton />
        </div>
      </div>
    </nav>
  );
}

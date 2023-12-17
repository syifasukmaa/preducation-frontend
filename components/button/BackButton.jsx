'use client';
import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { IoMdArrowRoundBack } from 'react-icons/io';

export default function BackButton() {
  const router = useRouter();
  const url = usePathname();

  const urlShouldButton = url.startsWith('/admin/course/chapter/') || url.startsWith('/admin/course/video/');

  return (
    <button
      onClick={() => router.back()}
      className={`mx-4 mt-8 md:mx-12 bg-primary-dark-blue rounded-lg hover:scale-110 hover:transition-all ${
        !urlShouldButton ? 'hidden' : ''
      }`}
    >
      <span className="flex items-center px-2 py-1 text-sm font-semibold text-white">
        <IoMdArrowRoundBack
          size={20}
          className="mr-2"
        />
        Kembali
      </span>
    </button>
  );
}

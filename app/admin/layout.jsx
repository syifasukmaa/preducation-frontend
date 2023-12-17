import BackButton from '@/components/button/BackButton';
import CardAdmin from '@/components/card/CardAdmin';
import Navbar from '@/components/navbar/Navbar';
import Sidenavbar from '@/components/sidebar/Sidebar';
import React from 'react';

export const metadata = {
  title: 'Preducation | Admin',
  description: 'Preducation online course',
};

export default function Layout({ children }) {
  return (
    <div className="relative flex flex-1">
      <Sidenavbar />
      <main className="flex-2 overflow-y-auto w-[86%] md:w-9/12 lg:w-[85%] absolute right-0">
        <Navbar />
        <BackButton />
        <CardAdmin />
        {children}
      </main>
    </div>
  );
}

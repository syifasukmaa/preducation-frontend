import React from 'react';
import LiveAreaIcon from '@/components/icons/LiveAreaIcon';

export default function FilterButton({ onClick }) {
  return (
    <button
      className="flex items-center border-[1px] border-dark-blue-05 py-[2px] px-[4px] rounded-2xl mr-3"
      onClick={onClick}
    >
      <LiveAreaIcon />
      <p className="ml-1 text-dark-blue-05 font-bold text-base">Filter</p>
    </button>
  );
}

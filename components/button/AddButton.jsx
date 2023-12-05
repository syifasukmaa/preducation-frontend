import React from 'react';
import AddIcon from '@/components/icons/AddIcon';
export default function AddButton({ onClick }) {
  return (
    <button
      className="flex items-center border-[1px] bg-orange-05 border-orange-05 py-[3px] px-[7px] rounded-2xl mr-3 text-base hover:scale-105 transition-all"
      onClick={onClick}
    >
      <AddIcon />
      <p className="ml-1 font-bold text-base text-neutral-01">Tambah</p>
    </button>
  );
}

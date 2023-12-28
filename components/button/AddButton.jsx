import React from 'react';
import { IoAddCircleOutline } from 'react-icons/io5';
export default function AddButton({ onClick }) {
  return (
    <button
      className="flex items-center border-[1px] dark:border-orange-05  bg-orange-05 dark:bg-transparent hover:border-orange-05 py-[3px] px-[7px] rounded-2xl mr-3 text-base hover:scale-105 transition-all"
      onClick={onClick}
      data-testid="add-button"
    >
      <IoAddCircleOutline
        className="text-neutral-02 dark:text-orange-05"
        size={25}
      />
      <p className="ml-1 text-base font-bold text-neutral-02 dark:text-orange-05">Tambah</p>
    </button>
  );
}

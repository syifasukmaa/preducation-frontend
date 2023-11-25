import React from 'react';
import { IoMdClose } from 'react-icons/io';

export default function ClosesButton({ style, onClick }) {
  return (
    <button
      className={style}
      onClick={onClick}
    >
      <IoMdClose className="text-neutral-01" />
    </button>
  );
}

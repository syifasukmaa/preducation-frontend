import React from 'react';

export default function ActionButton({ styles, children, onClick }) {
  return (
    <button
      className={`${styles} text-white py-1 px-3 rounded-xl mr-1.5 mb-1.5 border-2 border-transparent hover:bg-neutral-01 hover:border-2 transition-all hover:text-black duration-100 ease-in-out flex items-center justify-center`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

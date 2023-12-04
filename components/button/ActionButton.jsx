import React from 'react';

export default function ActionButton({ styles, children, onClick }) {
  return (
    <button
      className={`${styles} text-white py-1 px-3 rounded-xl mr-1.5 mb-1.5 hover:bg-neutral-01 hover:border-2 transition-all hover:text-black hover:py-1 hover:px-3 duration-100 ease-in-out`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

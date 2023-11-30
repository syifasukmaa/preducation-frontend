import React from 'react';

export default function ActionButton({ styles, children, onClick }) {
  return (
    <button
      className={`${styles} text-white py-1 px-3 rounded-xl mr-1.5 mb-1.5`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
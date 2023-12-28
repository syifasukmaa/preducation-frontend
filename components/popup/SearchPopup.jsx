import React from 'react';
import ClosesButton from '../button/ClosesButton';

export default function SearchPopup({ onClick, title, setTitle, handleChange }) {
  return (
    <div
      data-testid="search-popup-container"
      className="absolute top-0 right-0 z-10"
    >
      <div className="flex">
        <input
          type="text"
          placeholder="Cari..."
          className="px-6 py-1 border rounded-md solid border-orange-05 dark:bg-slate-300"
          value={title}
          onChange={handleChange}
        />
        <ClosesButton
          onClick={onClick}
          style={'bg-orange-05 ml-1 text-white px-3 py-1 rounded'}
        />
      </div>
    </div>
  );
}

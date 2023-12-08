'use client';
import React, { useState } from 'react';

export default function Dropdown({ value, onChange, options, required }) {
  const [clicked, setClicked] = useState(false);

  const handleInputClick = () => {
    setClicked(true);
  };
  return (
    <div className="mt-3 w-full">
      <label
        htmlFor="dropdown"
        className="block text-[10px] font-semibold leading-6 text-gray-900"
      >
        Category
      </label>

      <select
        value={value}
        onChange={onChange}
        className={`block w-full border bg-white border-gray-300 py-3 px-3 rounded-2xl text-[14px] focus:outline-none focus-within:ring-2 focus-within:ring-inset focus-within:ring-gray-300 ${
          required && clicked && !value ? 'ring-1 ring-inset ring-red-600' : value ? 'ring-1 ring-inset ring-black' : ''
        }`}
      >
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            className="text-[14px]"
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

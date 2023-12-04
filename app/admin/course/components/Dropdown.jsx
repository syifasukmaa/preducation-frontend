import React from 'react';

export default function Dropdown({ value, onChange, options }) {
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
        className="block w-full border bg-white border-gray-300 py-3 px-3 rounded-2xl text-[12px] focus:outline-none focus:border-indigo-600"
      >
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            className="text-[12px]"
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

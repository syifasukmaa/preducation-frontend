'use state';
import React, { useState } from 'react';

export default function Input({ type, label, name, placeholder, value, textarea, onChange, required }) {
  const [clicked, setClicked] = useState(false);

  const handleInputClick = () => {
    setClicked(true);
  };
  return (
    <div className="mt-3 w-full">
      <label
        htmlFor={name}
        className="label-modal"
      >
        {label}
        {required && clicked && !value && <p className="text-red-500">Field Required</p>}
      </label>
      <div className={`input-modal-wrapper`}>
        {textarea ? (
          <textarea
            name={name}
            id={name}
            value={value}
            onChange={onChange}
            onClick={handleInputClick}
            className={`input-modal h-32 ${
              required && clicked && !value
                ? 'ring-1 ring-inset ring-red-600'
                : value
                ? 'ring-1 ring-inset ring-black'
                : ''
            }`}
            placeholder={placeholder}
          />
        ) : (
          <input
            type={type}
            name={name}
            id={name}
            value={value}
            onChange={onChange}
            onClick={handleInputClick}
            className={`input-modal ${
              required && clicked && !value
                ? 'ring-1 ring-inset ring-red-600'
                : value
                ? 'ring-1 ring-inset ring-black'
                : ''
            }`}
            placeholder={placeholder}
          />
        )}
      </div>
    </div>
  );
}

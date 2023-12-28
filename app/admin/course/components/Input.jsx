'use state';
import React, { useState } from 'react';
import '../../../globals.css';

export default function Input({ type, label, name, placeholder, value, textarea, onChange, required }) {
  const [clicked, setClicked] = useState(false);

  const handleInputClick = () => {
    setClicked(true);
  };
  return (
    <div className="w-full mt-3">
      <label
        htmlFor={name}
        className="label-modal dark:text-dark-grey-02"
      >
        {label}
        {required && clicked && !value && <p className="text-red-500 ">Field Required</p>}
      </label>
      <div className={`input-modal-wrapper`}>
        {textarea ? (
          <textarea
            name={name}
            id={name}
            value={value}
            onChange={onChange}
            onClick={handleInputClick}
            className={`input-modal h-32 dark:text-dark-grey-02  ${
              required && clicked && !value
                ? 'ring-1 ring-inset ring-red-600'
                : value
                ? 'ring-1 ring-inset ring-black dark:ring-dark-grey-02'
                : 'ring-1 ring-dark-grey-02'
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
            className={`input-modal dark:text-dark-grey-02 ${
              required && clicked && !value
                ? 'ring-1 ring-inset ring-red-600'
                : value
                ? 'ring-1 ring-inset ring-black dark:ring-dark-grey-02'
                : 'ring-1 ring-dark-grey-02'
            }`}
            placeholder={placeholder}
          />
        )}
      </div>
    </div>
  );
}

import React from 'react';

export default function Input({
  type,
  label,
  name,
  placeholder,
  value,
  textarea,
  onChange,
}) {
  return (
    <div className="mt-3 w-full">
      <label
        htmlFor={name}
        className="label-modal"
      >
        {label}
      </label>

      <div className="input-modal-wrapper">
        {textarea ? (
          <textarea
            name={name}
            id={name}
            value={value}
            onChange={onChange}
            className="input-modal h-32"
            placeholder={placeholder}
          />
        ) : (
          <input
            type={type}
            name={name}
            id={name}
            value={value}
            onChange={onChange}
            className="input-modal"
            placeholder={placeholder}
          />
        )}
      </div>
    </div>
  );
}

import React from 'react';

export default function Checkbox({ label, checked, onChange }) {
  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        className="form-checkbox h-5 w-5 text-blue-500 "
        checked={checked}
        onChange={onChange}
      />
      <span className="ml-2 text-neutral-01">{label}</span>
    </div>
  );
}

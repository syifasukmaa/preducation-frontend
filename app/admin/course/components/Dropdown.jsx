'use client';
import React, { useState } from 'react';

export default function Dropdown({ label, children }) {
  return (
    <div className="w-full mt-3">
      <label
        htmlFor="dropdown"
        className="label-dropdown"
      >
        {label}
      </label>

      {children}
    </div>
  );
}

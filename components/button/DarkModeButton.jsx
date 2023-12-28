'use client';
import React, { useEffect, useState } from 'react';
import { MdOutlineDarkMode, MdOutlineLightMode } from 'react-icons/md';

export default function DarkModeButton() {
  const [dark, setDark] = useState(true);

  const toggleDark = () => {
    setDark(!dark);
  };

  useEffect(() => {
    if (dark == false) {
      document.querySelector('html').className = 'light';
    } else {
      document.querySelector('html').className = 'dark';
    }
  }, [dark]);

  return (
    <button onClick={toggleDark}>
      {dark ? <MdOutlineLightMode /> : <MdOutlineDarkMode className="text-dark-grey" />}
    </button>
  );
}

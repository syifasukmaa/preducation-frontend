import React from 'react';
import Form from './Form';

export default function Navbar() {
  return (
    <nav className=" bg-light-blue-05 py-5 md:px-12 px-4 flex justify-between items-center text-dark-blue-05 ">
      <div className="text-dark-blue-05 xl:text-2xl md:text-xl font-bold text-center">
        Hi, Admin!
      </div>
      <Form />
    </nav>
  );
}

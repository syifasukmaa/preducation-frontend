import React from 'react';
import ClosesButton from '../button/ClosesButton';

export default function FilterPopup({ children, clickClose }) {
  return (
    <>
      <div className="absolute bg-dark-blue-05 top-12 right-0 py-4 pl-4 pr-10 rounded-lg z-30">
        <div className="">
          {children}
          <ClosesButton
            style={'absolute top-2 right-2 text-neutral-01'}
            onClick={clickClose}
          />
        </div>
      </div>
      <div className="absolute top-9  right-14 w-6 h-6 bg-dark-blue-05 transform -rotate-45 z-40"></div>
    </>
  );
}

import React from 'react';
import ClosesButton from '../button/ClosesButton';

export default function FilterPopup({ children, clickClose }) {
  return (
    <>
      <div className="py-4 pl-4 pr-10 rounded-lg bg-orange-05">
        <div className="">
          {children}
          <ClosesButton
            style={'absolute top-2 right-2 text-neutral-01'}
            onClick={clickClose}
          />
        </div>
      </div>
      <div className="absolute z-40 w-6 h-6 transform -rotate-45 -top-1 right-14 bg-orange-05"></div>
    </>
  );
}

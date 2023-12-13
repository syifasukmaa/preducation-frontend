import React from 'react';
import ClosesButton from '../button/ClosesButton';

export default function FilterPopup({ children, clickClose }) {
  return (
    <>
      <div className="bg-orange-05 py-4 pl-4 pr-10 rounded-lg">
        <div className="">
          {children}
          <ClosesButton
            style={'absolute top-2 right-2 text-neutral-01'}
            onClick={clickClose}
          />
        </div>
      </div>
      <div className="absolute top-9  right-14 w-6 h-6 bg-orange-05 transform -rotate-45 z-40"></div>
    </>
  );
}

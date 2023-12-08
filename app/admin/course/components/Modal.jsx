import React from 'react';
import ClosesButton from '@/components/button/ClosesButton';

export default function Modal({ title, nameButton, onClose, handleSave, children }) {
  return (
    <div className="fixed top-0 -left-0 w-full h-full flex items-center justify-center bg-neutral-05/75 z-50 ">
      <div className="bg-white py-10 px-16 lg:py-12 lg:px-28 rounded-2xl shadow-lg w-3/4 lg:w-3/5 max-h-[92%] max-w-full overflow-y-auto relative">
        <h2 className="text-[20px] font-bold text-center mb-4 text-primary">{title}</h2>

        <form
          onSubmit={handleSave}
          className="flex flex-col items-center"
        >
          {children}

          <button
            type="submit"
            className="mt-10 lg:px-32 py-3 bg-orange-05 w-full text-white rounded-[25px] font-bold shadow-xl border-2 hover:border-orange-05 hover:text-black hover:bg-white"
          >
            {nameButton}
          </button>
        </form>
        <ClosesButton
          style={'absolute top-5 right-3 text-orange-05 hover:text-black'}
          onClick={onClose}
        />
      </div>
    </div>
  );
}

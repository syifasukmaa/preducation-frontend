'use client';
import React, { useEffect } from 'react';
import { LuLoader2 } from 'react-icons/lu';
import ClosesButton from '@/components/button/ClosesButton';

export default function Modal({ title, nameButton, onClose, handleSave, children, modalRef, isDisabled, isLoading }) {
  useEffect(() => {
    let handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose, modalRef]);
  return (
    <div className='fixed top-0 z-50 flex items-center justify-center w-full h-full -left-0 bg-neutral-05/75 '>
      <div
        ref={modalRef}
        className='bg-white dark:bg-dark-grey py-10 px-16 lg:py-12 lg:px-28 rounded-2xl shadow-lg w-3/4 lg:w-3/5 max-h-[92%] max-w-full overflow-y-auto relative'
      >
        <h2 className='text-[20px] font-bold text-center mb-4 text-primary dark:text-dark-grey-02'>{title}</h2>

        <form
          onSubmit={handleSave}
          className='flex flex-col items-center'
        >
          {children}

          <button
            type='submit'
            disabled={isDisabled || isLoading ? true : false}
            data-testid={nameButton}
            className={`${
              isDisabled || isLoading ? 'cursor-not-allowed' : ''
            } mt-10 lg:px-32 h-12 bg-orange-05 w-full text-white rounded-[25px] font-bold shadow-xl border-2 hover:border-orange-05 hover:text-black hover:bg-white active:scale-75 flex items-center justify-center`}
          >
            {isLoading ? (
              <LuLoader2
                className='animate-spin'
                size='24'
              />
            ) : (
              nameButton
            )}
          </button>
        </form>
        <ClosesButton
          style={'absolute top-5 right-3 text-orange-05 hover:text-black dark:hover:text-dark-grey-02'}
          onClick={onClose}
        />
      </div>
    </div>
  );
}

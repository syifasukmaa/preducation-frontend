import React from 'react';

export default function ActionButton({ styles, children, onClick, testId }) {
  return (
    <button
      className={`${styles} text-white py-1 px-3 rounded-xl mr-1.5 mb-1.5 border-2 border-transparent hover:bg-neutral-01 dark:hover:bg-dark-grey hover:border-2 transition-all hover:text-black duration-100 ease-in-out flex items-center dark:hover:text-dark-grey-02 justify-center active:scale-90 max-w-[85%]`}
      onClick={onClick}
      data-testid={`action-button${testId}`}
    >
      {children}
    </button>
  );
}

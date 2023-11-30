import React from 'react';

export default function Form() {
  return (
    <form className="flex items-center w-6/12 md:w-fit">
      <div className="relative">
        <input
          type="text"
          placeholder="Cari"
          className="py-2 md:py-3 pl-4 pr-12 md:pl-4 md:pr-12 rounded-[12px] md:rounded-[16px] focus:outline-none bg-neutral-01 box-border"
          style={{ width: 'calc(100% - 12px)' }}
        />
        <button className="h-8 bg-dark-blue-05 w-8 rounded-[10px] absolute right-6 top-1/2 transform -translate-y-1/2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            className="ml-[5px]"
          >
            <path
              d="M10 18C11.775 17.9996 13.4988 17.4054 14.897 16.312L19.293 20.708L20.707 19.294L16.311 14.898C17.405 13.4997 17.9996 11.7754 18 10C18 5.589 14.411 2 10 2C5.589 2 2 5.589 2 10C2 14.411 5.589 18 10 18ZM10 4C13.309 4 16 6.691 16 10C16 13.309 13.309 16 10 16C6.691 16 4 13.309 4 10C4 6.691 6.691 4 10 4Z"
              fill="#EBF3FC"
            />
            <path
              d="M11.4118 8.58609C11.7908 8.96609 11.9998 9.46809 11.9998 10.0001H13.9998C14.0007 9.47451 13.8974 8.95398 13.6959 8.46857C13.4944 7.98316 13.1987 7.54251 12.8258 7.17209C11.3118 5.66009 8.68683 5.66009 7.17383 7.17209L8.58583 8.58809C9.34583 7.83009 10.6558 7.83209 11.4118 8.58609Z"
              fill="#EBF3FC"
            />
          </svg>
        </button>
      </div>
    </form>
  );
}
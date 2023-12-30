import React from 'react';

export default function PaymentLoading({ testId }) {
  return (
    <tr
      data-testid={`payment-loading${testId}`}
      className="my-10"
    >
      <td className="px-4 w-[15%]">
        <p className="w-20 py-1 my-4 rounded-sm animate-pulse bg-neutral-03 dark:bg-neutral-04"></p>
      </td>
      <td className="px-4 w-[15%]">
        <div className="flex flex-col justify-between h-full">
          <p className="py-1 rounded-sm animate-pulse bg-neutral-03 dark:bg-neutral-04"></p>
        </div>
      </td>
      <td className="px-4 w-[15%]">
        <p className="w-[60%] py-1 rounded-sm animate-pulse bg-neutral-03 dark:bg-neutral-04"></p>
      </td>
      <td className="px-4 w-[15%]">
        <p className="py-1 rounded-sm w-[60%] animate-pulse bg-neutral-03 dark:bg-neutral-04"></p>
      </td>
      <td className="px-4 w-[20%]">
        <div className="flex flex-col justify-between h-full">
          <p className="py-1 mt-1 rounded-sm animate-pulse bg-neutral-03 dark:bg-neutral-04 w-[50%]"></p>
        </div>
      </td>
      <td className="px-4 w-[20%]">
        <div className="flex flex-col justify-between h-full">
          <p className="w-3/5 py-1 pl-4 mt-1 rounded-sm animate-pulse bg-neutral-03 dark:bg-neutral-04 lg:pl-0 lg:pr-1"></p>
        </div>
      </td>
      <td className="pl-8 w-[10%]">
        <p className="py-1 rounded-sm w-[100%] animate-pulse bg-neutral-03 dark:bg-neutral-04"></p>
      </td>
    </tr>
  );
}

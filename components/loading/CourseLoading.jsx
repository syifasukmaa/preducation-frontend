import React from 'react';

export default function CourseLoading() {
  return (
    <>
      <tr className="my-10">
        <td className="px-4 w-12">
          <p className="py-1 my-4 animate-pulse bg-neutral-03 rounded-sm"></p>
        </td>
        <td className="px-4 w-24">
          <div className="flex flex-col h-full justify-between">
            <p className="py-1 w-1/2 animate-pulse bg-neutral-03 rounded-sm"></p>
            <p className="py-1 mt-[3px] w-3/4 animate-pulse bg-neutral-03 rounded-sm"></p>
          </div>
        </td>
        <td className="px-4 w-72">
          <p className="py-1 animate-pulse bg-neutral-03 rounded-sm"></p>
        </td>
        <td className="px-4 w-12">
          <p className="py-1 px-4 animate-pulse bg-neutral-03 rounded-sm"></p>
        </td>
        <td className="px-4 w-16">
          <p className="py-1 px-4 animate-pulse bg-neutral-03 rounded-sm"></p>
        </td>
        <td className="px-4 w-16">
          <p className="py-1 animate-pulse bg-neutral-03 rounded-sm"></p>
        </td>
        <td className="px-4 w-48">
          <div className="flex flex-col lg:flex-row justify-between h-full">
            <p className="py-2 w-16 mt-2 xl:mt-0 animate-pulse bg-neutral-03 rounded-md"></p>
            <p className="py-2 w-16 mt-2 xl:mt-0 animate-pulse bg-neutral-03 rounded-md"></p>
            <p className="py-2 w-16 mt-2 xl:mt-0 animate-pulse bg-neutral-03 rounded-md"></p>
          </div>
        </td>
      </tr>
    </>
  );
}

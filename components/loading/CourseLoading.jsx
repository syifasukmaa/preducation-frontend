import React from 'react';

export default function CourseLoading() {
  return (
    <tr className="my-10">
      <td className="w-12 px-4">
        <p className="py-1 my-4 rounded-sm animate-pulse bg-neutral-03"></p>
      </td>
      <td className="w-24 px-4">
        <div className="flex flex-col justify-between h-full">
          <p className="w-1/2 py-1 rounded-sm animate-pulse bg-neutral-03"></p>
          <p className="py-1 mt-[3px] w-3/4 animate-pulse bg-neutral-03 rounded-sm"></p>
        </div>
      </td>
      <td className="px-4 w-72">
        <p className="py-1 rounded-sm animate-pulse bg-neutral-03"></p>
      </td>
      <td className="w-12 px-4">
        <p className="px-4 py-1 rounded-sm animate-pulse bg-neutral-03"></p>
      </td>
      <td className="w-16 px-4">
        <p className="px-4 py-1 rounded-sm animate-pulse bg-neutral-03"></p>
      </td>
      <td className="w-16 px-4">
        <p className="py-1 rounded-sm animate-pulse bg-neutral-03"></p>
      </td>
      <td className="w-48 px-4">
        <div className="flex flex-col h-full lg:flex-row">
          <p className="w-16 py-2 mt-2 rounded-md xl:mt-0 animate-pulse bg-neutral-03"></p>
          <p className="w-16 py-2 mt-2 ml-2 rounded-md xl:mt-0 animate-pulse bg-neutral-03"></p>
        </div>
      </td>
    </tr>
  );
}

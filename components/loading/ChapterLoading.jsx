import React from 'react';

export default function ChapterLoading() {
  return (
    <tr className="my-10">
      <td className="px-4 w-[5%]">
        <p className="py-1 my-4 rounded-sm animate-pulse bg-neutral-03"></p>
      </td>
      <td className="px-4 w-[20%]">
        <div className="flex flex-col justify-between h-full">
          <p className="py-1 rounded-sm animate-pulse bg-neutral-03"></p>
        </div>
      </td>
      <td className="px-4 w-[15%]">
        <p className="py-1 rounded-sm animate-pulse bg-neutral-03"></p>
      </td>
      <td className="px-4 w-[40%]">
        <div className="flex flex-col justify-between h-full">
          <p className="w-5/6 py-1 mt-1 rounded-sm animate-pulse bg-neutral-03"></p>
          <p className="w-3/4 py-1 mt-1 rounded-sm animate-pulse bg-neutral-03"></p>
          <p className="w-4/5 py-1 mt-1 rounded-sm animate-pulse bg-neutral-03"></p>
        </div>
      </td>
      <td className="px-4 w-[40%]">
        <div className="flex flex-col justify-start h-full lg:flex-row">
          <p className="w-16 py-3 mt-2 mr-2 xl:mt-0 animate-pulse bg-neutral-03 rounded-xl"></p>
          <p className="w-16 py-3 mt-2 mr-2 xl:mt-0 animate-pulse bg-neutral-03 rounded-xl"></p>
          <p className="w-16 py-3 mt-2 xl:mt-0 animate-pulse bg-neutral-03 rounded-xl"></p>
        </div>
      </td>
    </tr>
  );
}

import React from 'react';

export default function ChapterLoading() {
  return (
    <>
      <tr className="my-10">
        <td className="px-4 w-[5%]">
          <p className="py-1 my-4 animate-pulse bg-neutral-03 rounded-sm"></p>
        </td>
        <td className="px-4 w-[20%]">
          <div className="flex flex-col h-full justify-between">
            <p className="py-1 animate-pulse bg-neutral-03 rounded-sm"></p>
          </div>
        </td>
        <td className="px-4 w-[15%]">
          <p className="py-1 animate-pulse bg-neutral-03 rounded-sm"></p>
        </td>
        <td className="px-4 w-[40%]">
          <div className="flex flex-col h-full justify-between">
            <p className="py-1 mt-1 w-5/6 animate-pulse bg-neutral-03 rounded-sm"></p>
            <p className="py-1 mt-1 w-3/4 animate-pulse bg-neutral-03 rounded-sm"></p>
            <p className="py-1 mt-1 w-4/5 animate-pulse bg-neutral-03 rounded-sm"></p>
          </div>
        </td>
        <td className="px-4 w-[40%]">
          <div className="flex flex-col lg:flex-row justify-start h-full">
            <p className="py-3 w-16 mt-2 xl:mt-0 mr-2 animate-pulse bg-neutral-03 rounded-xl"></p>
            <p className="py-3 w-16 mt-2 xl:mt-0 animate-pulse bg-neutral-03 rounded-xl"></p>
          </div>
        </td>
      </tr>
    </>
  );
}

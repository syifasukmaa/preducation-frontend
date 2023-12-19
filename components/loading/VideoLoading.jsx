import React from 'react';

export default function VideoLoading() {
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
        <p className="w-1/2 py-1 rounded-sm animate-pulse bg-neutral-03"></p>
      </td>
      <td className="px-4 w-[10%]">
        <p className="w-1/4 py-1 rounded-sm animate-pulse bg-neutral-03"></p>
      </td>
      <td className="px-4 w-[50%]">
        <div className="flex flex-col justify-between h-full">
          <p className="py-16 mt-5 rounded-sm animate-pulse bg-neutral-03"></p>
          <p className="w-3/4 py-1 mt-1 rounded-sm animate-pulse bg-neutral-03"></p>
        </div>
      </td>
      <td className="px-4 w-[30%]">
        <div className="flex flex-col justify-start h-full lg:flex-row">
          <p className="w-8 py-4 mt-2 mr-2 rounded-md xl:mt-0 animate-pulse bg-neutral-03"></p>
          <p className="w-8 py-4 mt-2 rounded-md xl:mt-0 animate-pulse bg-neutral-03"></p>
        </div>
      </td>
    </tr>
  );
}

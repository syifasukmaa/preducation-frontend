import React from 'react'

export default function UserLoading({ testId }) {
  return (
    <tr key={testId} className="my-10">
      <td className="w-12 px-4">
        <p className="py-1 my-4 rounded-sm animate-pulse bg-neutral-03 dark:bg-neutral-04"></p>
      </td>
      <td className="px-4 w-60">
        <p className="py-1 rounded-sm animate-pulse bg-neutral-03 dark:bg-neutral-04"></p>
      </td>
      <td className="w-12 px-4">
        <p className="px-4 py-1 rounded-sm animate-pulse bg-neutral-03 dark:bg-neutral-04"></p>
      </td>
      <td className="w-16 px-4">
        <p className="px-4 py-1 rounded-sm animate-pulse bg-neutral-03 dark:bg-neutral-04"></p>
      </td>
      <td className="w-16 px-4">
        <p className="py-1 rounded-sm animate-pulse bg-neutral-03 dark:bg-neutral-04"></p>
      </td>
      <td className="w-48 px-4">
        <div className="flex flex-col h-full lg:flex-row">
          <p className="w-20 py-4 mt-2 rounded-lg xl:mt-0 animate-pulse bg-neutral-03 dark:bg-neutral-04"></p>
          <p className="w-20 py-4 mt-2 ml-2 rounded-lg xl:mt-0 animate-pulse bg-neutral-03 dark:bg-neutral-04"></p>
        </div>
      </td>
    </tr>
  )
}

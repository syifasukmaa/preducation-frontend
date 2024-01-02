import React from 'react'

const PaginationButton = ({ currentPage, handleCurrentPage, totalData, limit }) => {
  return (
    <div className="flex items-center justify-end pl-4 mt-8">
      <button
        disabled={currentPage <= 1 ? true : false}
        onClick={() => handleCurrentPage(Number(currentPage) - 1)}
        className={`${
          currentPage <= 1 ? 'bg-slate-700/80 cursor-not-allowed' : 'bg-primary-dark-blue hover:bg-orange-05'
        } text-white font-medium py-1 w-20 rounded text-sm`}
      >
        Previous
      </button>
      <button
        disabled={currentPage >= Math.ceil(totalData / limit) ? true : false}
        onClick={() => handleCurrentPage(Number(currentPage) + 1)}
        className={`${
          currentPage >= Math.ceil(totalData / limit)
            ? 'bg-slate-700/80 cursor-not-allowed'
            : 'bg-primary-dark-blue hover:bg-orange-05'
        } text-white font-medium py-1 w-20 rounded text-sm ml-5 `}
      >
        Next
      </button>
    </div>
  )
}

export default PaginationButton

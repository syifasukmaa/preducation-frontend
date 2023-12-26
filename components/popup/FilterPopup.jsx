import React from 'react'
import ClosesButton from '../button/ClosesButton'

export default function FilterPopup({ children, clickClose }) {
  return (
    <>
      <div className="px-4 py-4 bg-white rounded-lg shadow-xl" data-testid="filter-popup-container">
        {children}
        <ClosesButton style={'absolute top-2 right-2 text-orange-05 hover:text-black'} onClick={clickClose} />
      </div>
    </>
  )
}

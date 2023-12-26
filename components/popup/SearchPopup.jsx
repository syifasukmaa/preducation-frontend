import React from 'react'
import ClosesButton from '../button/ClosesButton'

export default function SearchPopup({ onClick, title, setTitle }) {
  return (
    <div data-testid="search-popup-container" className="absolute bg-white z-10 top-0 right-0">
      <div className="flex">
        <input
          type="text"
          placeholder="Cari..."
          className="border solid border-orange-05 px-6 py-1 rounded-md"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <ClosesButton onClick={onClick} style={'bg-orange-05 ml-1 text-white px-3 py-1 rounded'} />
      </div>
    </div>
  )
}

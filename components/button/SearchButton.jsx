import React from 'react'

import SearchIcon from '@/components/icons/SearchIcon'

export default function SearchButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="hover:scale-110 transition-all"
      aria-label="search"
      data-testid="search-button"
    >
      <SearchIcon />
    </button>
  )
}

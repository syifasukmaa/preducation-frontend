import React from 'react';

import SearchIcon from '@/components/icons/SearchIcon';

export default function SearchButton({ onClick }) {
  return (
    <button onClick={onClick}>
      <SearchIcon />
    </button>
  );
}

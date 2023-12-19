import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import SearchPopup from '@/components/popup/SearchPopup'

describe('SearchPopup Component', () => {
  it('renders the search input and close button', () => {
    const mockOnClick = jest.fn()
    const mockSetTitle = jest.fn()

    const { getByPlaceholderText, getByTestId } = render(
      <SearchPopup onClick={mockOnClick} title="Initial Title" setTitle={mockSetTitle} />
    )

    const searchInput = getByPlaceholderText('Cari...')
    expect(searchInput).toBeInTheDocument()
    expect(searchInput.value).toBe('Initial Title')

    const closeButton = getByTestId('close-button')
    expect(closeButton).toBeInTheDocument()

    fireEvent.change(searchInput, { target: { value: 'New Title' } })

    expect(mockSetTitle).toHaveBeenCalledWith('New Title')

    fireEvent.click(closeButton)

    expect(mockOnClick).toHaveBeenCalled()
  })
})

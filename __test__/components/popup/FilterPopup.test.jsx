import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import FilterPopup from '@/components/popup/FilterPopup'

describe('FilterPopup Component', () => {
  it('renders children and close button', () => {
    const mockClickClose = jest.fn()

    const { getByText, getByTestId } = render(
      <FilterPopup clickClose={mockClickClose}>
        <div>Filter Content</div>
      </FilterPopup>
    )

    expect(getByText('Filter Content')).toBeInTheDocument()

    const closeButton = getByTestId('close-button')
    expect(closeButton).toBeInTheDocument()

    fireEvent.click(closeButton)

    expect(mockClickClose).toHaveBeenCalled()
  })
})

import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import NavBar from '@/components/navbar/Navbarlp'

describe('NavBar Component', () => {
  it('renders NavBar component', () => {
    render(<NavBar />)
    // You can add more specific tests based on your component structure
    expect(screen.getByAltText('preducationLogo')).toBeInTheDocument()
    expect(screen.getByText('Beranda')).toBeInTheDocument()
    expect(screen.getByText('Tentang Kami')).toBeInTheDocument()
    expect(screen.getByText('Kursus')).toBeInTheDocument()
    expect(screen.getByText('Kontak')).toBeInTheDocument()
  })

  it('toggles the menu when the menu button is clicked', () => {
    render(<NavBar />)
    const menuButton = screen.getByTestId('menu-button')

    fireEvent.click(menuButton)

    expect(screen.getByTestId('subnav-container')).toHaveClass(
      'md:static absolute bg-primary-dark-blue  min-h-[30vh] md:min-h-fit w-[95%] left-3 top-[12%] flex items-center px-5'
    )

    fireEvent.click(menuButton)

    expect(screen.queryByText('Beranda')).not.toHaveClass(
      'md:static absolute bg-primary-dark-blue  min-h-[30vh] md:min-h-fit w-[95%] left-3 top-[12%] flex items-center px-5'
    )
  })
})

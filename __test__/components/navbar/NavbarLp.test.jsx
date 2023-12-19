import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import NavBar from '@/components/navbar/Navbarlp'

describe('NavBar Component', () => {
  it('renders NavBar component', () => {
    render(<NavBar />)
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
      'md:static absolute bg-primary-dark-blue pb-10 pt-24 min-h-[100vh] z-50 md:min-h-fit w-[50%] right-0 top-0 flex items-start px-5'
    )

    fireEvent.click(menuButton)

    expect(screen.queryByText('Beranda')).not.toHaveClass(
      'md:static absolute bg-primary-dark-blue pb-10 pt-24 min-h-[100vh] z-50 md:min-h-fit w-[50%] right-0 top-0 flex items-start px-5'
    )
  })
})

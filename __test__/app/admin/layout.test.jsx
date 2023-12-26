import Layout, { metadata } from '@/app/admin/layout'
import { render } from '@testing-library/react'

jest.mock('@/components/button/BackButton', () => () => <div data-testid="mock-back-button" />)
jest.mock('@/components/card/CardAdmin', () => () => <div data-testid="mock-card-admin" />)
jest.mock('@/components/navbar/Navbar', () => () => <div data-testid="mock-navbar" />)
jest.mock('@/components/sidebar/Sidebar', () => () => <div data-testid="mock-sidebar" />)

describe('Layout Component', () => {
  it('renders components correctly', () => {
    const { getByTestId } = render(<Layout />)

    expect(getByTestId('mock-sidebar')).toBeInTheDocument()
    expect(getByTestId('mock-navbar')).toBeInTheDocument()
    expect(getByTestId('mock-back-button')).toBeInTheDocument()
    expect(getByTestId('mock-card-admin')).toBeInTheDocument()
  })
  it('should metadata is correct', () => {
    expect(metadata).toEqual({
      title: 'Preducation | Admin',
      description: 'Preducation online course',
    })
  })
})

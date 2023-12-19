import React from 'react'
import { render } from '@testing-library/react'
import { useSession } from 'next-auth/react'
import Navbar from '@/components/navbar/Navbar'

jest.mock('next-auth/react', () => ({
  useSession: jest.fn(),
}))

describe('Navbar Component', () => {
  it('renders the navbar with user name', () => {
    const mockSession = {
      user: {
        name: 'John Doe',
      },
    }

    useSession.mockReturnValue({ data: mockSession })

    const { getByText } = render(<Navbar />)

    const greetingElement = getByText('Hi, John Doe!')
    expect(greetingElement).toBeInTheDocument()
  })

  it('renders the navbar without user name when not authenticated', () => {
    useSession.mockReturnValue({ data: null })

    const { getByText } = render(<Navbar />)

    const defaultGreetingElement = getByText('Hi, !')
    expect(defaultGreetingElement).toBeInTheDocument()
  })
})

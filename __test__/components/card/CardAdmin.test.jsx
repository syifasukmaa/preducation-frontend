import React from 'react'
import { render, screen } from '@testing-library/react'
import CardAdmin from '@/components/card/CardAdmin'
import { useSession } from 'next-auth/react'
import { useCategory } from '@/utils/swr'

jest.mock('next-auth/react', () => ({
  useSession: jest.fn(),
}))

jest.mock('@/utils/swr', () => ({
  useCategory: jest.fn(),
}))

describe('CardAdmin', () => {
  it('renders loading state', async () => {
    useSession.mockReturnValueOnce({ data: { user: { accessToken: 'testAccessToken' } } })
    useCategory.mockReturnValueOnce({
      categories: null,
      error: null,
      isLoading: true,
    })
    const { container, getByText } = render(<CardAdmin />)
    expect(container).toMatchSnapshot()
    expect(getByText('loading')).toBeInTheDocument()
  })

  it('renders error state', async () => {
    useSession.mockReturnValueOnce({ data: {} })
    useCategory.mockReturnValueOnce({ categories: null, error: new Error('Test error'), isLoading: false })

    const { container, getByText } = render(<CardAdmin />)
    expect(container).toMatchSnapshot()
    expect(getByText('error')).toBeInTheDocument()
  })

  it('renders data state', async () => {
    useSession.mockReturnValueOnce({ data: { user: { accessToken: 'testAccessToken' } } })
    useCategory.mockReturnValueOnce({
      categories: { activeUsers: 10, activeClass: 5, premiumClass: 2 },
      error: null,
      isLoading: false,
    })

    render(<CardAdmin />)

    expect(screen.getByText('Active Users')).toBeInTheDocument()
    expect(screen.getByText('Active Class')).toBeInTheDocument()
    expect(screen.getByText('Premium Class')).toBeInTheDocument()
  })
})

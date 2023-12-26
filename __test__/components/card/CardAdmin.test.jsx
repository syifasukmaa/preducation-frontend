import React from 'react'
import { render, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import CardAdmin from '@/components/card/CardAdmin'

jest.mock('next-auth/react', () => ({
  useSession: jest.fn(),
}))

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
  useParams: jest.fn(),
}))

jest.mock('@/utils/swr', () => ({
  useCategory: jest.fn(),
}))

describe('CardAdmin component', () => {
  it('renders loading state while fetching data', async () => {
    // Mock useSession, usePathname, useParams, and useCategory hooks
    jest.spyOn(require('next-auth/react'), 'useSession').mockReturnValue({})
    jest.spyOn(require('next/navigation'), 'usePathname').mockReturnValue('/admin/course/123')
    jest.spyOn(require('next/navigation'), 'useParams').mockReturnValue({ id: '123' })
    jest.spyOn(require('@/utils/swr'), 'useCategory').mockReturnValue({ isLoading: true })

    const { getByTestId } = render(<CardAdmin />)

    expect(getByTestId('first-loading-admin')).toHaveClass(
      'w-full h-[95px] bg-neutral-03 flex items-center py-5 pl-6 pr-6 rounded-[15px] animate-pulse'
    )
  })

  it('renders error state if there is an error while fetching data', async () => {
    jest.spyOn(require('next-auth/react'), 'useSession').mockReturnValue({})
    jest.spyOn(require('next/navigation'), 'usePathname').mockReturnValue('/admin/course/123')
    jest.spyOn(require('next/navigation'), 'useParams').mockReturnValue({ id: '123' })
    jest.spyOn(require('@/utils/swr'), 'useCategory').mockReturnValue({ error: 'Some error message' })

    const { getByText } = render(<CardAdmin />)

    const errorElement = getByText(/error: Some error message/i)
    expect(errorElement).toBeInTheDocument()
  })

  it('renders the component with data when data is available', async () => {
    jest.spyOn(require('next-auth/react'), 'useSession').mockReturnValue({ data: {} })
    jest.spyOn(require('next/navigation'), 'usePathname').mockReturnValue('/admin/course/123')
    jest.spyOn(require('next/navigation'), 'useParams').mockReturnValue({ id: '123' })
    jest.spyOn(require('@/utils/swr'), 'useCategory').mockReturnValue({
      categories: {
        activeUsers: 10,
        activeClass: 5,
        premiumClass: 3,
      },
      isLoading: false,
    })

    const { getByText } = render(<CardAdmin />)

    expect(getByText(/active users/i)).toBeInTheDocument()
    expect(getByText(/active class/i)).toBeInTheDocument()
    expect(getByText(/premium class/i)).toBeInTheDocument()
  })
})

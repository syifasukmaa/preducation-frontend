import { render, fireEvent, screen } from '@testing-library/react'
import BackButton from '@/components/button/BackButton'
import { usePathname, useRouter } from 'next/navigation'

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
}))

describe('Back Button Component', () => {
  it('renders correctly when on valid page', () => {
    useRouter.mockImplementation(() => ({ back: jest.fn() }))
    usePathname.mockReturnValue('/admin/course/chapter/1')

    const { container } = render(<BackButton />)

    expect(container.querySelector('button')).toBeInTheDocument()
  })

  it('does not render when on invalid page', () => {
    useRouter.mockImplementation(() => ({ back: jest.fn() }))
    usePathname.mockReturnValue('/')

    const { container } = render(<BackButton />)

    expect(container.querySelector('button')).toHaveClass('hidden')
  })

  it('calls router.back() when clicked', () => {
    const mockBack = jest.fn()
    useRouter.mockImplementation(() => ({ back: mockBack }))
    usePathname.mockReturnValue('/admin/course/chapter/1')

    render(<BackButton />)

    fireEvent.click(screen.getByText('Kembali'))

    expect(mockBack).toHaveBeenCalledTimes(1)
  })
})

import { render, fireEvent, screen } from '@testing-library/react'
import BackButton from '@/components/button/BackButton'
import * as nextNavigation from 'next/navigation'

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
  useParams: jest.fn(),
}))

describe('Back Button Component', () => {
  it('renders correctly when the URL matches the conditions', () => {
    const useRouterMock = {
      back: jest.fn(),
    }
    jest.spyOn(nextNavigation, 'useRouter').mockReturnValue(useRouterMock)
    jest.spyOn(nextNavigation, 'usePathname').mockReturnValue('/admin/course/chapter/123')
    jest.spyOn(nextNavigation, 'useParams').mockReturnValue({ id: '123' })

    const { getByText } = render(<BackButton />)

    const button = getByText('Kembali')
    expect(button).toBeInTheDocument()

    fireEvent.click(button)
    expect(useRouterMock.back).toHaveBeenCalledTimes(1)
  })

  it('renders correctly when the URL does not match the conditions', () => {
    jest.spyOn(nextNavigation, 'usePathname').mockReturnValue('/some/other/path')
    jest.spyOn(nextNavigation, 'useParams').mockReturnValue({ id: '456' })

    const { getByRole } = render(<BackButton />)

    // The button should not be rendered
    expect(getByRole('button')).toHaveClass('hidden ')
  })
})

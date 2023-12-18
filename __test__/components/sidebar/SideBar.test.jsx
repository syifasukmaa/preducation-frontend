import Sidebar from '@/components/sidebar/Sidebar'
import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { signOut } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import Swal from 'sweetalert2'

jest.mock('next/navigation', () => ({
  ...jest.requireActual('next/navigation'),
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
  usePathname: jest.fn(),
}))

jest.mock('next-auth/react', () => ({
  signOut: jest.fn(),
}))

jest.mock('sweetalert2', () => ({
  fire: jest.fn(),
}))

describe('Navbar Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('Should renders the sidebar component', () => {
    usePathname.mockReturnValue('/admin/dashboard')

    const container = render(<Sidebar />)
    expect(container).toMatchSnapshot()
  })

  it('toggles the Sidebar when the hamburger button is clicked', async () => {
    const { getByTitle } = render(<Sidebar />)
    const hamburgerButton = getByTitle('hamburger-button')
    expect(hamburgerButton).toBeInTheDocument()
    expect(hamburgerButton.innerHTML).toContain(
      '<svg stroke="currentColor" fill="none" stroke-width="0" viewBox="0 0 15 15" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M1.5 3C1.22386 3 1 3.22386 1 3.5C1 3.77614 1.22386 4 1.5 4H13.5C13.7761 4 14 3.77614 14 3.5C14 3.22386 13.7761 3 13.5 3H1.5ZM1 7.5C1 7.22386 1.22386 7 1.5 7H13.5C13.7761 7 14 7.22386 14 7.5C14 7.77614 13.7761 8 13.5 8H1.5C1.22386 8 1 7.77614 1 7.5ZM1 11.5C1 11.2239 1.22386 11 1.5 11H13.5C13.7761 11 14 11.2239 14 11.5C14 11.7761 13.7761 12 13.5 12H1.5C1.22386 12 1 11.7761 1 11.5Z" fill="currentColor"></path></svg>'
    )
    await userEvent.click(hamburgerButton)

    expect(hamburgerButton.innerHTML).toContain(
      '<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M405 136.798L375.202 107 256 226.202 136.798 107 107 136.798 226.202 256 107 375.202 136.798 405 256 285.798 375.202 405 405 375.202 285.798 256z"></path></svg>'
    )
  })

  it('handles navigation when a side bar item is clicked', async () => {
    usePathname.mockReturnValue('/admin/dashboard')
    const { getByTestId } = render(<Sidebar />)

    //expect after clicked, will redirect to page /admin/course
    fireEvent.click(getByTestId('Dashboard'))
    expect(screen.getByText(/Kelola Kelas/i)).toBeInTheDocument()
  })

  it('Handles logout when "Keluar" is clicked ', async () => {
    await Swal.fire.mockResolvedValueOnce({ isConfirmed: true })

    const { getByTestId } = render(<Sidebar />)
    const logoutButton = getByTestId('handle-logout')

    fireEvent.click(logoutButton)

    expect(Swal.fire).toHaveBeenCalledWith({
      title: 'Apakah yakin?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#167F71',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Keluar',
      cancelButtonText: 'Batal',
    })

    await Swal.fire.mockResolvedValueOnce({ isConfirmed: true })

    expect(signOut).toHaveBeenCalled()
  })
})

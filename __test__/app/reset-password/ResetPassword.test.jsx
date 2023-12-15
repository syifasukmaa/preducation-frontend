import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import ResetPasswordPage from '@/app/reset-password/page'

jest.mock('next/navigation', () => ({
  useSearchParams: jest.fn(() => ({ get: jest.fn(() => 'mocked_token') })),
}))

jest.mock('@/utils/fetch', () => ({
  resetPassword: jest.fn(() => Promise.resolve({ ok: true, json: () => ({}) })),
}))

describe('Reset Password Page', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  it('Should render', () => {
    const page = render(<ResetPasswordPage />)
    expect(page).toMatchSnapshot()
  })

  it('Should contain Text Reset Password', () => {
    render(<ResetPasswordPage />)
    expect(screen.getByRole('heading')).toHaveTextContent('Reset Password')
  })

  it('Should toggles password visibility when eye icon is clicked', () => {
    render(<ResetPasswordPage />)
    const eyeIcon = screen.getByTitle('button-visibility')
    const passwordInput = screen.getByPlaceholderText('Password')

    expect(passwordInput.type).toBe('password')

    fireEvent.click(eyeIcon)
    expect(passwordInput.type).toBe('text')
  })

  //   it('Handles form submission successfully', async () => {
  //     const resetPassword = require('@/utils/fetch').resetPassword
  //     resetPassword.mockResolvedValueOnce({ ok: true })
  //     render(<ResetPasswordPage />)

  //     console.log(resetPassword)

  //     fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'new_password_example' } })
  //     fireEvent.change(screen.getByPlaceholderText('Konfirmasi password'), {
  //       target: { value: 'confirm_password_example' },
  //     })
  //     fireEvent.click(screen.getByText('Ganti'))

  //     await waitFor(() => {
  //       expect(resetPassword).toHaveBeenCalledWith('mocked_token', 'new_password_example', 'confirm_password_example')
  //       expect(screen.getByText('Anda berhasil mengubah password')).toBeInTheDocument()
  //     })
  //   })
})

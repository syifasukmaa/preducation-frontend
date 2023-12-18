import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import ResetPasswordPage from '@/app/reset-password/page'
import Layout, { metadata } from '@/app/reset-password/layout'
import * as fetchUtils from '@/utils/fetch'
import { useSearchParams } from 'next/navigation'
import { toast } from 'react-toastify'

jest.mock('next/navigation', () => ({
  useSearchParams: jest.fn(() => ({ get: jest.fn(() => 'mockToken') })),
}))

jest.mock('@/utils/fetch', () => ({
  resetPassword: jest.fn(),
}))

describe('Reset Password Page', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    useSearchParams.mockReturnValue({
      get: jest.fn(() => 'mockToken'),
    })
  })
  it('Should render', () => {
    const page = render(
      <Layout>
        <ResetPasswordPage />
      </Layout>
    )
    expect(page).toMatchSnapshot()
  })

  it('should metadata is correct', () => {
    expect(metadata).toEqual({
      title: 'Preducation | Reset Password',
      description: 'Preducation online course',
    })
  })

  it('Should contain Text Reset Password', () => {
    render(<ResetPasswordPage />)
    expect(screen.getByRole('heading')).toHaveTextContent('Reset Password')
  })

  it('Should toggles password visibility when eye icon is clicked', () => {
    render(<ResetPasswordPage />)
    const eyeIcon = screen.getByTitle('button-visibility-password')
    const passwordInput = screen.getByPlaceholderText('Password')

    expect(passwordInput.type).toBe('password')

    fireEvent.click(eyeIcon)
    expect(passwordInput.type).toBe('text')
  })
  it('Should toggles confirm password visibility when eye icon is clicked', () => {
    render(<ResetPasswordPage />)
    const eyeIcon = screen.getByTitle('button-visibility-confpassword')
    const passwordInput = screen.getByPlaceholderText('Konfirmasi password')

    expect(passwordInput.type).toBe('password')

    fireEvent.click(eyeIcon)
    expect(passwordInput.type).toBe('text')
  })

  it('Handles form submission successfully', async () => {
    const mockToastSuccess = jest.fn()
    const mockResetPassword = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn(() => Promise.resolve({ message: 'Password reset successful' })),
    })

    jest.spyOn(fetchUtils, 'resetPassword').mockImplementation(mockResetPassword)
    jest.spyOn(toast, 'success').mockImplementation(mockToastSuccess)

    render(<ResetPasswordPage />)

    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'newPassword' } })
    fireEvent.change(screen.getByPlaceholderText('Konfirmasi password'), { target: { value: 'newPassword' } })

    fireEvent.click(screen.getByText('Ganti'))

    await waitFor(() => {
      expect(mockResetPassword).toHaveBeenCalledWith('mockToken', 'newPassword', 'newPassword')
      expect(mockToastSuccess).toHaveBeenCalledWith('Anda berhasil mengubah password', {
        position: 'top-right',
      })
      expect(screen.getByPlaceholderText('Password')).toHaveValue('')
      expect(screen.getByPlaceholderText('Konfirmasi password')).toHaveValue('')
    })
  })
  it('Handles form submission failure "Password min 8 karakter"', async () => {
    const mockToastError = jest.fn()
    const mockResetPassword = jest.fn().mockResolvedValue({
      ok: false,
      json: jest.fn(() => Promise.resolve({ message: 'Minimum password 8 characters' })),
    })

    jest.spyOn(fetchUtils, 'resetPassword').mockImplementation(mockResetPassword)
    jest.spyOn(toast, 'error').mockImplementation(mockToastError)

    render(<ResetPasswordPage />)

    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'newPa' } })
    fireEvent.change(screen.getByPlaceholderText('Konfirmasi password'), { target: { value: 'newPa' } })

    fireEvent.click(screen.getByText('Ganti'))

    await waitFor(() => {
      expect(mockResetPassword).toHaveBeenCalledWith('mockToken', 'newPa', 'newPa')
      expect(mockToastError).toHaveBeenCalledWith('Password min 8 karakter', {
        position: 'top-right',
      })
    })
  })
  it('Handles form submission failure "Tautan invalid atau kedaluwarsa"', async () => {
    const mockToastError = jest.fn()
    const mockResetPassword = jest.fn().mockResolvedValue({
      ok: false,
      json: jest.fn(() => Promise.resolve({ message: 'User not found for the given token' })),
    })

    jest.spyOn(fetchUtils, 'resetPassword').mockImplementation(mockResetPassword)
    jest.spyOn(toast, 'error').mockImplementation(mockToastError)

    render(<ResetPasswordPage />)

    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'newPassword' } })
    fireEvent.change(screen.getByPlaceholderText('Konfirmasi password'), { target: { value: 'newPassword' } })

    fireEvent.click(screen.getByText('Ganti'))

    await waitFor(() => {
      expect(mockResetPassword).toHaveBeenCalledWith('mockToken', 'newPassword', 'newPassword')
      expect(mockToastError).toHaveBeenCalledWith('Tautan invalid atau kedaluwarsa', {
        position: 'top-right',
      })
    })
  })
  it('Handles form submission failure "Internal Server Error"', async () => {
    const mockToastError = jest.fn()
    const mockResetPassword = jest.fn().mockRejectedValue(new Error('Internal Server Error'))

    jest.spyOn(fetchUtils, 'resetPassword').mockImplementation(mockResetPassword)
    jest.spyOn(toast, 'error').mockImplementation(mockToastError)

    render(<ResetPasswordPage />)

    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'newPassword' } })
    fireEvent.change(screen.getByPlaceholderText('Konfirmasi password'), { target: { value: 'newPassword' } })

    fireEvent.click(screen.getByText('Ganti'))

    await waitFor(() => {
      expect(mockResetPassword).toHaveBeenCalledWith('mockToken', 'newPassword', 'newPassword')
      expect(mockToastError).toHaveBeenCalledWith('Internal Server Error', {
        position: 'top-right',
      })
    })
  })
  it('Handles form submission failure other error', async () => {
    const mockToastError = jest.fn()
    const mockResetPassword = jest.fn().mockResolvedValue({
      ok: false,
      json: jest.fn(() => Promise.resolve({ message: 'Test error' })),
    })

    jest.spyOn(fetchUtils, 'resetPassword').mockImplementation(mockResetPassword)
    jest.spyOn(toast, 'error').mockImplementation(mockToastError)

    render(<ResetPasswordPage />)

    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'newPassword' } })
    fireEvent.change(screen.getByPlaceholderText('Konfirmasi password'), { target: { value: 'newPassword' } })
    fireEvent.click(screen.getByText('Ganti'))

    await waitFor(() => {
      expect(mockResetPassword).toHaveBeenCalledWith('mockToken', 'newPassword', 'newPassword')
      expect(mockToastError).toHaveBeenCalledWith('Terjadi Kesalahan', {
        position: 'top-right',
      })
    })
  })
})

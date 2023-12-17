import LoginPage from '@/app/login/page';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { signIn } from 'next-auth/react';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({ push: jest.fn() })),
}));

jest.mock('next-auth/react', () => ({
  signIn: jest.fn(),
}));

describe('Login Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('Should render', () => {
    const page = render(<LoginPage />);
    expect(page).toMatchSnapshot();
  });

  it('Should contain Text Login', () => {
    render(<LoginPage />);
    expect(screen.getByRole('heading')).toHaveTextContent('Login');
  });

  it('Should toggles password visibility when eye icon is clicked', () => {
    render(<LoginPage />);
    const eyeIcon = screen.getByTitle('button-visibility');
    const passwordInput = screen.getByPlaceholderText('Password');

    expect(passwordInput.type).toBe('password');

    fireEvent.click(eyeIcon);
    expect(passwordInput.type).toBe('text');
  });

  it('handles form submission successfully', async () => {
    signIn.mockResolvedValueOnce({ ok: true });
    render(<LoginPage />);

    fireEvent.change(screen.getByPlaceholderText('ID Admin'), { target: { value: 'admin_user' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'adminpass' } });

    fireEvent.click(screen.getByText('Masuk'));

    await waitFor(() => {
      expect(signIn).toHaveBeenCalledWith('credentials', {
        username: 'admin_user',
        password: 'adminpass',
        redirect: false,
      });
      expect(screen.getByText('Anda berhasil masuk!'));
      expect(require('next/navigation').useRouter().push('/admin/dashboard'));
    });
  });

  it('handles form submission failure', async () => {
    signIn.mockResolvedValueOnce({ ok: false });
    render(<LoginPage />);

    fireEvent.change(screen.getByPlaceholderText('ID Admin'), { target: { value: 'wrong_admin' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'wrong_pass' } });

    fireEvent.click(screen.getByText('Masuk'));

    await waitFor(async () => {
      const errorMessage = screen.getByText('Username atau password salah');
      expect(errorMessage).toBeInTheDocument();
    });
  });
});

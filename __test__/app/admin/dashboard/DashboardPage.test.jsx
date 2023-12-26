import { render, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import DashboardPage from '@/app/admin/dashboard/page'
import * as nextAuthReact from 'next-auth/react'
import * as swrHook from '@/utils/swr'
import Layout, { metadata } from '@/app/admin/dashboard/layout'

jest.mock('next-auth/react', () => ({
  useSession: jest.fn(),
}))

jest.mock('@/utils/swr', () => ({
  usePayment: jest.fn(),
}))

describe('Dashboard Page Component', () => {
  let useSessionSpy
  let usePaymentSpy

  beforeEach(() => {
    useSessionSpy = jest.spyOn(nextAuthReact, 'useSession')
    useSessionSpy.mockReturnValue({
      data: {
        user: {
          accessToken: 'mockAccessToken',
        },
      },
    })

    usePaymentSpy = jest.spyOn(swrHook, 'usePayment')
    usePaymentSpy.mockReturnValue({
      payment: [
        {
          _id: '1',
          userId: { username: 'testUser' },
          courseId: { category: { name: 'TestCategory' }, level: 'TestLevel' },
          status: 'Paid',
          paymentType: 'Credit Card',
          createdAt: '2023-01-01T12:00:00Z',
        },
        {
          _id: '2',
          userId: { username: 'testUser2' },
          courseId: { category: { name: 'TestCategory' }, level: 'TestLevel' },
          status: 'On Progress',
          paymentType: 'Credit Card',
          createdAt: '2023-01-01T12:00:00Z',
        },
      ],
      isLoading: false,
      error: null,
      mutate: jest.fn(),
    })
  })

  afterEach(() => {
    useSessionSpy.mockRestore()
    usePaymentSpy.mockRestore()
  })
  it('renders the Dashboard page', async () => {
    const page = render(
      <Layout>
        <DashboardPage />
      </Layout>
    )
    expect(page).toMatchSnapshot()
    expect(page.getByText(/Status Pembayaran/i)).toBeInTheDocument()
  })
  it('should metadata is correct', () => {
    expect(metadata).toEqual({
      title: 'Preducation | Dashboard',
      description: 'Preducation online course',
    })
  })
  it('handles filter button click', async () => {
    const { container, getByTestId } = render(<DashboardPage />)

    fireEvent.click(getByTestId('filter-button'))
    expect(getByTestId('filter-popup-container')).toBeInTheDocument()

    fireEvent.click(getByTestId('close-button'))
    expect(container).not
      .toContain(`<div className="px-4 py-4 bg-white rounded-lg shadow-xl" data-testid="filter-popup-container">
        {children}
        <ClosesButton style={'absolute top-2 right-2 text-orange-05 hover:text-black'} onClick={clickClose} />
      </div>`)
  })

  it('handles search button click', async () => {
    const { container, getByTestId, getByPlaceholderText } = render(<DashboardPage />)

    fireEvent.click(getByTestId('search-button'))
    expect(getByPlaceholderText('Cari...')).toBeInTheDocument()
    expect(getByTestId('search-popup-container')).toBeInTheDocument()

    fireEvent.click(getByTestId('close-button'))
    expect(container).not
      .toContain(`<div data-testid="search-popup-container" className="absolute bg-white z-10 top-0 right-0">
      <div className="flex">
        <input
          type="text"
          placeholder="Cari..."
          className="border solid border-orange-05 px-6 py-1 rounded-md"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <ClosesButton onClick={onClick} style={'bg-orange-05 ml-1 text-white px-3 py-1 rounded'} />
      </div>
    </div>`)
  })

  it('ensures that filterCourses is called correctly when SUDAH BAYAR item is clicked', () => {
    const { getByTestId, getByText } = render(<DashboardPage />)

    fireEvent.click(getByTestId('filter-button'))
    fireEvent.click(getByTestId('paid-button'))
    expect(getByText('testUser2')).toBeInTheDocument()
  })

  it('ensures that filterCourses is called correctly when BELUM BAYAR item is clicked', () => {
    const { getByTestId, getByText } = render(<DashboardPage />)

    fireEvent.click(getByTestId('filter-button'))
    fireEvent.click(getByTestId('onprogress-button'))
    expect(getByText('testUser')).toBeInTheDocument()
  })

  it('handles refresh button click', async () => {
    const { getByTestId } = render(<DashboardPage />)

    fireEvent.click(getByTestId('refresh-button'))
    expect(usePaymentSpy.mock.calls[1][2]).toBe('')
  })

  it('handles outside click to close filter popup', async () => {
    const { getByTestId, queryByTestId } = render(<DashboardPage />)
    userEvent.click(getByTestId('filter-button'))
    userEvent.click(document.body)

    await waitFor(() => {
      expect(queryByTestId('filter-popup-container')).not.toBeInTheDocument()
    })
  })
  it('displays loading state', async () => {
    usePaymentSpy.mockReturnValue({ payment: null, isLoading: true, error: null, mutate: jest.fn() })

    const { getByTestId } = render(<DashboardPage />)
    expect(getByTestId('payment-loading1')).toBeInTheDocument()
  })
})

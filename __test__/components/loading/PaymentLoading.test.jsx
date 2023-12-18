import PaymentLoading from '@/components/loading/PaymentLoading'
import { render } from '@testing-library/react'

describe('Payment Loading', () => {
  it('renders loading skeleton', () => {
    const container = render(<PaymentLoading />)
    expect(container).toMatchSnapshot()
  })
})

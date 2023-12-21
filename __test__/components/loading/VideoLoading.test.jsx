import VideoLoading from '@/components/loading/VideoLoading'
import { render } from '@testing-library/react'

describe('Video Loading', () => {
  it('renders loading skeleton', () => {
    const container = render(<VideoLoading />)
    expect(container).toMatchSnapshot()
  })
})

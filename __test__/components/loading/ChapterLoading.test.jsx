import { render } from '@testing-library/react'
import ChapterLoading from '@/components/loading/ChapterLoading'

describe('Chapter Loading', () => {
  it('renders loading skeleton', () => {
    const container = render(<ChapterLoading />)
    expect(container).toMatchSnapshot()
  })
})

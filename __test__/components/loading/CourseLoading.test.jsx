import CourseLoading from '@/components/loading/CourseLoading'
import { render } from '@testing-library/react'

describe('Course Loading', () => {
  it('renders loading skeleton', () => {
    const container = render(<CourseLoading />)
    expect(container).toMatchSnapshot()
  })
})

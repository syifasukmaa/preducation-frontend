import DetailCourseLoading from '@/components/loading/DetailCourseLoading'
import { render } from '@testing-library/react'

describe('Detail Course Loading', () => {
  it('renders loading skeleton', () => {
    const container = render(<DetailCourseLoading />)
    expect(container).toMatchSnapshot()
  })
})

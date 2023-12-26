import { render } from '@testing-library/react'
import * as swrHook from '@/utils/swr'
import LandingPage from '@/app/page'

jest.mock('@/utils/swr')

describe('LandingPage Component', () => {
  it('renders courses correctly when data is available', async () => {
    const mockCourses = [
      {
        _id: '1',
        thumbnail: '/course-thumbnail.jpg',
        title: 'Sample Course',
        totalRating: 4,
        price: 100,
        totalDuration: 10,
        level: 'Beginner',
        totalModule: 5,
      },
    ]

    const useCourseSpy = jest.spyOn(swrHook, 'useCourse')
    useCourseSpy.mockReturnValue({ course: mockCourses })

    const { getByText, getByTestId } = render(<LandingPage />)

    expect(getByText('Sample Course')).toBeInTheDocument()
    expect(getByText('Rp. 100')).toBeInTheDocument()
    expect(getByText('10 Jam')).toBeInTheDocument()
    expect(getByText('Beginner')).toBeInTheDocument()
    expect(getByText('5 Modul')).toBeInTheDocument()
    expect(getByTestId('star-container').firstChild).toHaveClass('text-bintang-hidup')
    expect(getByTestId('star-container').children[1]).toHaveClass('text-bintang-hidup')
    expect(getByTestId('star-container').children[2]).toHaveClass('text-bintang-hidup')
    expect(getByTestId('star-container').children[3]).toHaveClass('text-bintang-hidup')
    expect(getByTestId('star-container').children[4]).toHaveClass('text-bintang-mati')
  })
})

import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import * as swrHook from '@/utils/swr'
import * as nextAuthReact from 'next-auth/react'
import ModalCreateCourse from '@/app/admin/course/components/ModalCreateCourse'

jest.mock('@/utils/swr')
jest.mock('@/utils/fetch', () => ({
  createNewCourse: jest.fn(),
  updateCourse: jest.fn(),
}))
jest.mock('@/components/alert/successAlert', () => jest.fn())
jest.mock('@/components/alert/ToastSweet', () => jest.fn())

describe('ModalCreateCourse Component', () => {
  const mockProps = {
    onClose: jest.fn(),
    editMode: false,
    token: 'your_token',
    courseId: 'your_course_id',
    mutate: jest.fn(),
    setShowModal: jest.fn(),
  }

  let mockCategoryData
  let useSessionSpy
  let nextTick
  beforeEach(() => {
    useSessionSpy = jest.spyOn(nextAuthReact, 'useSession')
    useSessionSpy.mockReturnValue({
      data: {
        user: {
          accessToken: 'mockAccessToken',
        },
      },
    })
    mockCategoryData = jest.spyOn(swrHook, 'useCategory')
    mockCategoryData.mockReturnValueOnce({
      categories: [
        {
          _id: '6579a2744761001f9e48df51',
          name: 'Product Management',
        },
        {
          _id: '6579a2744761001f9e48df52',
          name: 'Web Development',
        },
      ],
      isLoading: false,
      error: null,
      mutate: jest.fn(),
    })

    nextTick = () => new Promise((resolve) => setTimeout(resolve, 0))
  })
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders ModalCreateCourse component', () => {
    render(<ModalCreateCourse {...mockProps} />)
    expect(screen.getByText('Tambah Kelas')).toBeInTheDocument()
  })
})

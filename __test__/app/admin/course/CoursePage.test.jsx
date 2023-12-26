import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import CoursePage from '@/app/admin/course/page'
import * as swrHook from '@/utils/swr'
import * as nextNavigation from 'next/navigation'
import * as nextAuthReact from 'next-auth/react'
import Layout, { metadata } from '@/app/admin/course/layout'

jest.mock('@/utils/swr')

jest.mock('@/utils/fetch')

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({ push: jest.fn() })),
}))

describe('CoursePage Component', () => {
  let mockCourseData
  let nextTick
  let useSessionSpy
  beforeEach(() => {
    useSessionSpy = jest.spyOn(nextAuthReact, 'useSession')
    useSessionSpy.mockReturnValue({
      data: {
        user: {
          accessToken: 'mockAccessToken',
        },
      },
    })
    mockCourseData = jest.spyOn(swrHook, 'useCourse')
    mockCourseData.mockReturnValueOnce({
      course: [
        {
          _id: '657d4aeef3a1584038bb0669',
          title: 'Belajar Dasar Android Studio baru',
          description: 'belajar android ',
          classCode: 'PM010',
          category: {
            _id: '6579a2744761001f9e48df51',
            name: 'Product Management',
          },
          typeClass: 'PREMIUM',
          level: 'Advanced',
          price: 5000000,
        },
        {
          _id: '657bd4b43c3a3815ae0caf42',
          title: 'Belajar Javascript dasar',
          description: 'Belajar javascript dasar',
          classCode: 'WD002',
          category: {
            _id: '6579a2744761001f9e48df52',
            name: 'Web Development',
          },
          typeClass: 'PREMIUM',
          level: 'Beginner',
          price: 150000,
        },
      ],
      isLoading: false,
      error: null,
    })

    nextTick = () => new Promise((resolve) => setTimeout(resolve, 0))
  })
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders the course page', () => {
    render(
      <Layout>
        <CoursePage />
      </Layout>
    )
  })

  it('should metadata is correct', () => {
    expect(metadata).toEqual({
      title: 'Preducation | Kelola Kelas',
      description: 'Preducation online course',
    })
  })

  it('should move to the class details page when detail button is clicked', async () => {
    const mockRouterPush = jest.spyOn(nextNavigation, 'useRouter').mockReturnValue({
      push: jest.fn(),
    })

    const { getByTestId } = render(<CoursePage />)

    fireEvent.click(getByTestId('action-button1'))

    expect(mockRouterPush).toHaveBeenCalled()
  })

  // it('shhould show add course modal when add button is clicked', () => {
  //   const mockSetEditMode = jest.fn()
  //   const mockSetShowModal = jest.fn()

  //   jest.spyOn(React, 'useState').mockReturnValueOnce([false, mockSetEditMode]) // Assuming editMode is initially false
  //   jest.spyOn(React, 'useState').mockReturnValueOnce([false, mockSetShowModal]) // Assuming showModal is initially false
  //   // jest.spyOn(swrHook, 'useCourse').mockReturnValueOnce({
  //   //   courses: [
  //   //     {
  //   //       _id: '657d4aeef3a1584038bb0669',
  //   //       title: 'Belajar Dasar Android Studio baru',
  //   //       description: 'belajar android ',
  //   //       classCode: 'PM010',
  //   //       category: {
  //   //         _id: '6579a2744761001f9e48df51',
  //   //         name: 'Product Management',
  //   //       },
  //   //       typeClass: 'PREMIUM',
  //   //       level: 'Advanced',
  //   //       price: 5000000,
  //   //     },
  //   //     {
  //   //       _id: '657bd4b43c3a3815ae0caf42',
  //   //       title: 'Belajar Javascript dasar',
  //   //       description: 'Belajar javascript dasar',
  //   //       classCode: 'WD002',
  //   //       category: {
  //   //         _id: '6579a2744761001f9e48df52',
  //   //         name: 'Web Development',
  //   //       },
  //   //       typeClass: 'PREMIUM',
  //   //       level: 'Beginner',
  //   //       price: 150000,
  //   //     },
  //   //   ],
  //   //   isLoading: false,
  //   //   mutate: jest.fn(),
  //   //   error: null,
  //   // })

  //   const { getByTestId, getByText } = render(<CoursePage />)

  //   fireEvent.click(getByTestId('add-button'))

  //   expect(mockSetEditMode).toHaveBeenCalledWith(false)
  //   expect(mockSetShowModal).toHaveBeenCalledWith(true)
  //   // expect(getByText(/Tambah Kelas/i)).toBeInTheDocument()
  // })

  //   it('handles add course button click', () => {
  //     mockSession()
  //     mockCourseData()
  //     render(<CoursePage />)

  //     // Mock setShowModal
  //     const setShowModalMock = jest.fn()
  //     jest.spyOn(React, 'useState').mockReturnValueOnce([false, setShowModalMock])

  //     // Trigger the add course button click
  //     userEvent.click(screen.getByText('Add Course'))

  //     // Add your assertions for the expected behavior
  //     expect(setShowModalMock).toHaveBeenCalledWith(true)
  //   })

  //   it('handles filter button click and closes filter', async () => {
  //     mockSession()
  //     mockCourseData()
  //     render(<CoursePage />)

  //     // Mock setShowElements
  //     const setShowElementsMock = jest.fn()
  //     jest.spyOn(React, 'useState').mockReturnValueOnce([{ showFilter: false }, setShowElementsMock])

  //     // Trigger the filter button click
  //     userEvent.click(screen.getByText('Filter'))

  //     // Add your assertions for the expected behavior
  //     expect(setShowElementsMock).toHaveBeenCalledWith({ showFilter: true })

  //     // Click outside to close the filter
  //     fireEvent.mouseDown(document)

  //     // Wait for the next tick in the event loop
  //     await nextTick()

  //     // Add your assertions for the expected behavior
  //     expect(setShowElementsMock).toHaveBeenCalledWith({ showFilter: false })
  //   })

  //   it('handles delete course confirmation and shows success alert', async () => {
  //     mockSession()
  //     mockCourseData([{ _id: '1', title: 'Course 1' }])
  //     render(<CoursePage />)

  //     // Mock ConfirmDeleteAlert to return true
  //     ConfirmDeleteAlert.mockResolvedValueOnce(true)

  //     // Mock deleteCourse to return success
  //     mockDeleteCourse()

  //     // Trigger the delete course button click
  //     userEvent.click(screen.getByText('Delete'))

  //     // Wait for the next tick in the event loop
  //     await nextTick()

  //     // Add your assertions for the expected behavior
  //     expect(deleteCourse).toHaveBeenCalledWith('mocked-access-token', '1')
  //     expect(DeleteSuccessAlert).toHaveBeenCalledWith('Course')
  //   })

  // Add more it cases for different component interactions and behaviors
})

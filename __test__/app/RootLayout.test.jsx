import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import RootLayout, { metadata } from '@/app/layout'

jest.mock('next/font/google', () => ({
  Montserrat: jest.fn(() => ({ className: 'your-mock-class' })),
}))

describe('RootLayout component', () => {
  it('renders with the expected HTML structure and class', () => {
    const { container } = render(<RootLayout>Test Content</RootLayout>)

    expect(container.innerHTML).toContain(
      '<html lang="en"><body class="your-mock-class no-scrollbar">Test Content</body></html>'
    )
    expect(container.innerHTML).toContain('Test Content')
  })

  it('should metadata is correct', () => {
    expect(metadata).toEqual({
      title: 'Preducation',
      description: 'Preducation online course',
      icons: { apple: '/img/iconPreducation.png', icon: '/img/iconPreducation.png' },
    })
  })
})

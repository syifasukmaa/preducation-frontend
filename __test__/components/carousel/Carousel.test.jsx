import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import Carousel from '@/components/landingPage/Review'

describe('Carousel Component', () => {
  it('renders with initial content', () => {
    const { getByText } = render(<Carousel />)

    expect(
      getByText(
        '“Pembelajaran yang fleksibel dan mudah diakses. Saya bisa belajar kapan pun saya mau. Materi yang diajarkan sangat relevan dengan kebutuhan industri. Saya merasa lebih siap untuk menghadapi tantangan di tempat kerja setelah menyelesaikan kursus ini.”'
      )
    ).toBeInTheDocument()
    expect(getByText('Margot Robbie')).toBeInTheDocument()
  })

  it('handles previous and next page clicks', () => {
    const { getByTestId, getByAltText, getByText } = render(<Carousel />)

    fireEvent.click(getByTestId('next-page-button'))

    expect(
      getByText(
        '“Mulai dari dasar-dasar HTML, CSS, dan JavaScript, hingga pemrograman server dan pengelolaan database, kursus disini memberikan pemahaman menyeluruh tentang teknologi yang diperlukan untuk menjadi pengembang web lengkap.”'
      )
    ).toBeInTheDocument()
    expect(getByText('Scarlett Johansson')).toBeInTheDocument()
    expect(getByAltText('Scarlett Johansson')).toBeInTheDocument()

    fireEvent.click(getByTestId('prev-page-button'))

    expect(
      getByText(
        '“Pembelajaran yang fleksibel dan mudah diakses. Saya bisa belajar kapan pun saya mau. Materi yang diajarkan sangat relevan dengan kebutuhan industri. Saya merasa lebih siap untuk menghadapi tantangan di tempat kerja setelah menyelesaikan kursus ini.”'
      )
    ).toBeInTheDocument()
    expect(getByText('Margot Robbie')).toBeInTheDocument()
    expect(getByAltText('Margot Robbie')).toBeInTheDocument()
  })
})

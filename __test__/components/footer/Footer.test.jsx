import React from 'react'
import { render, screen } from '@testing-library/react'
import Footer from '@/components/footer/Footer'

describe('Footer Component', () => {
  it('renders contact information', () => {
    render(<Footer />)

    expect(screen.getByText('Kontak Kami')).toBeInTheDocument()
    expect(screen.getByText('Jakarta')).toBeInTheDocument()
    expect(screen.getByText('(000) 123-456')).toBeInTheDocument()
    expect(screen.getByText('preducation@example.com')).toBeInTheDocument()
  })

  it('renders Preducation links', () => {
    render(<Footer />)

    expect(screen.getByText('Preducation')).toBeInTheDocument()
    expect(screen.getByText('Tentang kelas')).toBeInTheDocument()
    expect(screen.getByText('Karir')).toBeInTheDocument()
  })

  it('renders Layanan links', () => {
    render(<Footer />)

    expect(screen.getByText('Layanan')).toBeInTheDocument()
    expect(screen.getByText('Kursus')).toBeInTheDocument()
    expect(screen.getByText('Kursus Populer')).toBeInTheDocument()
    expect(screen.getByText('Program')).toBeInTheDocument()
  })

  it('renders Bantuan links', () => {
    render(<Footer />)

    expect(screen.getByText('Bantuan')).toBeInTheDocument()
    expect(screen.getByText('FAQ')).toBeInTheDocument()
    expect(screen.getByText('Kebijakan Privasi')).toBeInTheDocument()
    expect(screen.getByText('Forum')).toBeInTheDocument()
    expect(screen.getByText('Syarat dan Ketentuan')).toBeInTheDocument()
  })

  it('renders Social Media links', () => {
    render(<Footer />)

    expect(screen.getByText('Social Media')).toBeInTheDocument()
    expect(screen.getByAltText('linkedin')).toBeInTheDocument()
    expect(screen.getByAltText('twitter')).toBeInTheDocument()
    expect(screen.getByAltText('instagram')).toBeInTheDocument()
  })

  it('renders copyright information', () => {
    render(<Footer />)

    expect(screen.getByText('Copyright 2023 | All Rights Reserved')).toBeInTheDocument()
  })
})

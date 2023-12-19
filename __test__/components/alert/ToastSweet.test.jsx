import React from 'react'
import { render, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import ToastSweet from '@/components/alert/ToastSweet'
import Swal from 'sweetalert2'

jest.mock('sweetalert2', () => {
  const fire = jest.fn()
  const stopTimer = jest.fn()
  const resumeTimer = jest.fn()

  return {
    mixin: jest.fn(() => ({
      fire,
      stopTimer,
      resumeTimer,
    })),
  }
})

describe('ToastSweet Component', () => {
  it('renders toast with error message', async () => {
    render(<ToastSweet />)

    expect(Swal.mixin).toHaveBeenCalledWith({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      didOpen: expect.any(Function),
    })

    expect(Swal.mixin().fire).toHaveBeenCalledWith({
      icon: 'error',
      title: 'Input Wajib Diisi',
    })
  })
})

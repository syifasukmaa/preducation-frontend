import '@testing-library/jest-dom'
import Swal from 'sweetalert2'
import successAlert from '@/components/alert/successAlert'

jest.mock('sweetalert2', () => ({
  fire: jest.fn(),
}))

describe('successAlert Function', () => {
  it('calls Swal.fire with the expected arguments', async () => {
    successAlert('membuat', 'item')
    expect(Swal.fire).toHaveBeenCalledWith({
      title: 'Berhasil!',
      text: 'Berhasil membuat item baru',
      icon: 'success',
      customClass: {
        title: 'custom-title-class',
        content: 'custom-text-class',
        popup: 'custom-card-class',
      },
    })
  })
})

import ConfirmDeleteAlert from '@/components/alert/confirmDeleteAlert'
import Swal from 'sweetalert2'

jest.mock('sweetalert2', () => ({
  fire: jest.fn(),
}))

describe('Confirm Delete Alert Component', () => {
  it('Should returns true when confirmed', async () => {
    Swal.fire.mockResolvedValueOnce({
      isConfirmed: true,
    })
    const result = await ConfirmDeleteAlert('Test Message')
    expect(Swal.fire).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'Apakah Yakin?',
        text: 'Test Message',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#167F71',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Hapus',
        cancelButtonText: 'Batal',
      })
    )
    expect(result).toBe(true)
  })
  it('Should returns false when cancelled', async () => {
    Swal.fire.mockResolvedValueOnce({
      isConfirmed: false,
    })
    const result = await ConfirmDeleteAlert('Test Message')
    expect(Swal.fire).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'Apakah Yakin?',
        text: 'Test Message',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#167F71',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Hapus',
        cancelButtonText: 'Batal',
      })
    )
    expect(result).toBe(false)
  })
})

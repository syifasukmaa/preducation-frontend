import DeleteSuccessAlert from '@/components/alert/DeleteSuccessAlert'
import Swal from 'sweetalert2'

jest.mock('sweetalert2', () => ({
  fire: jest.fn(),
}))

describe('Delete Success Alert Component', () => {
  it('displays success alert with correct message', async () => {
    const testItem = 'TestItem'

    await DeleteSuccessAlert(testItem)

    expect(Swal.fire).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'Berhasil!',
        text: 'TestItem berhasil dihapus.',
        icon: 'success',
      })
    )
  })
})

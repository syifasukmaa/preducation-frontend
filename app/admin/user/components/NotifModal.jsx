import Modal from '@/components/Modal'
import successAlert from '@/components/alert/successAlert'
import Input from '@/components/input-form/Input'
import { createNotif } from '@/utils/fetch'
import React, { useRef, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const NotifModal = ({ onClose, token, setShowModal }) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [isLoading, setIsLoading] = useState('')
  const modalRef = useRef(null)

  const handleSave = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const notifData = {
        title,
        description,
      }

      const response = await createNotif(token, notifData)
      if (response.ok) {
        setShowModal(false)
        successAlert('Membuat', 'Notifikasi')
      } else {
        throw new Error('Terjadi kesalahan')
      }
    } catch (error) {
      toast.error(error.message, {
        position: 'top-right',
      })
    } finally {
      setIsLoading(false)
    }
  }
  const isDisabled = title.length === 0 || description.length === 0

  return (
    <Modal
      title={'Kirim Notifikasi'}
      onClose={onClose}
      nameButton={'Kirim'}
      isDisabled={isDisabled}
      isLoading={isLoading}
      handleSave={handleSave}
      modalRef={modalRef}
    >
      <Input
        type={'text'}
        label="Judul"
        name="title"
        placeholder="Judul notifikasi"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <Input
        label="Deskripsi"
        type="text"
        name="description"
        placeholder="Deskripsi notifikasi"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />

      <ToastContainer />
    </Modal>
  )
}

export default NotifModal

import React, { useState, useRef } from 'react'
import { createUser } from '@/utils/fetch'
import successAlert from '@/components/alert/successAlert'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Modal from '@/components/Modal'
import Input from '@/components/input-form/Input'
import Dropdown from '@/components/input-form/Dropdown'

export default function ModalCreateUser({ onClose, token, mutate, setShowModal }) {
  const [click, setClick] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    role: '',
  })

  const modalRef = useRef(null)

  const roleOptions = [
    { label: 'Role', value: 'Role' },
    { label: 'Admin', value: 'admin' },
    { label: 'User', value: 'user' },
  ]

  const handleSave = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const newUserData = {
        name: form.name,
        email: form.email,
        phone: form.phone,
        password: form.password,
        role: form.role,
      }

      const response = await createUser(token, newUserData)
      const data = await response.json()
      if (response.ok) {
        setShowModal(false)
        mutate()
        successAlert('membuat', 'User')
      } else {
        handleErrorResponse(data.message)
      }
    } catch (error) {
      toast.error(error.message, {
        position: 'top-right',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleErrorResponse = (errorMessage) => {
    switch (errorMessage) {
      case 'Minimum password 8 characters':
        throw new Error('Minimal password adalah 8 karakter')
      case 'Email address already registered':
        throw new Error('Email sudah terdaftar')
      case 'Mobile phone already registered':
        throw new Error('No HP sudah terdaftar')
      default:
        throw new Error('Terjadi Kesalahan')
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setForm((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSelectClick = (e) => {
    setClick(true)
  }

  const isDisabled =
    form.role === 'Role' ||
    form.name.length === 0 ||
    form.email.length === 0 ||
    form.password.length === 0 ||
    form.role.length === 0 ||
    form.phone.length === 0

  return (
    <Modal
      title={'Tambah User'}
      onClose={onClose}
      nameButton={'Simpan'}
      handleSave={handleSave}
      modalRef={modalRef}
      isDisabled={isDisabled}
      isLoading={isLoading}
    >
      <Input
        type={'text'}
        label="Nama"
        name="name"
        placeholder="Nama user"
        value={form.name}
        onChange={handleInputChange}
        required
      />
      <Input
        label="Email"
        type="email"
        name="email"
        placeholder="Email user"
        value={form.email}
        onChange={handleInputChange}
        required
      />
      <Input
        type={'text'}
        label="No HP"
        name="phone"
        placeholder="No HP user"
        value={form.phone}
        onChange={handleInputChange}
        required
      />
      <Input
        label="Password"
        type="password"
        name="password"
        placeholder="Password user"
        value={form.password}
        onChange={handleInputChange}
        required
      />

      <Dropdown label="Role">
        <select
          name="role"
          value={form.role}
          onChange={handleInputChange}
          onClick={handleSelectClick}
          className={`select-dropdown ${form.role == 'Role' && click ? 'ring-fail' : form.role ? 'ring-success' : ''}`}
        >
          {roleOptions?.map((option, index) => (
            <option key={index} value={option.value} className="text-[14px]">
              {option.label}
            </option>
          ))}
        </select>
      </Dropdown>
      <ToastContainer />
    </Modal>
  )
}

import React, { useEffect, useState, useRef } from 'react'
import { updateUser } from '@/utils/fetch'
import { useUser } from '@/utils/swr'
import successAlert from '@/components/alert/successAlert'
import ToastSweet from '@/components/alert/ToastSweet'
import Image from 'next/image'
import 'react-toastify/dist/ReactToastify.css'
import Modal from '@/components/Modal'
import Input from '@/components/input-form/Input'
import Dropdown from '@/components/input-form/Dropdown'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function ModalUpdateUser({ onClose, token, userId, mutate, setShowModal }) {
  const [click, setClick] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [image, setImage] = useState('')
  const [imageProfile, setImageProfile] = useState(null)
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    country: '',
    city: '',
  })

  const modalRef = useRef(null)
  const { data: user } = useUser(token, userId, null, null)

  const roleOptions = [
    { label: 'Role', value: 'Role' },
    { label: 'Admin', value: 'admin' },
    { label: 'User', value: 'user' },
  ]

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        city: user.city,
        country: user.country,
      })
      setImageProfile(user.image_profile)
    }
  }, [user])

  const isDisabled =
    form.name?.length === 0 ||
    form.city?.length === 0 ||
    form.country?.length === 0 ||
    form.email?.length === 0 ||
    form.phone?.length === 0 ||
    form.role?.length === 0 ||
    form.imageProfile === null

  const handleSave = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      if (isDisabled) {
        ToastSweet()
        return
      }

      const formData = new FormData()
      formData.append('name', form.name)
      formData.append('city', form.city)
      formData.append('country', form.country)
      formData.append('email', form.email)
      formData.append('phone', form.phone)
      formData.append('role', form.role)
      formData.append('imageProfile', imageProfile)

      const response = await updateUser(token, userId, formData)

      if (response.ok) {
        setShowModal(false)
        mutate()
        successAlert('edit', 'User')
      } else {
        throw new Error('Terjadi Kesalahan')
      }
    } catch (error) {
      toast.error(error.message, {
        position: 'top-right',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setForm((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageProfile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImage(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }
  const handleSelectClick = (e) => {
    setClick(true)
  }

  return (
    <Modal
      title={'Edit User'}
      onClose={onClose}
      nameButton={'Perbarui'}
      isDisabled={isDisabled}
      isLoading={isLoading}
      handleSave={handleSave}
      modalRef={modalRef}
    >
      <>
        <div className=" flex justify-between items-center  gap-3 w-full px-3 py-4 mt-4">
          <div className=" flex flex-col items-center justify-center w-full gap-3">
            <label htmlFor="postFile" className="cursor-pointer">
              {image ? (
                <Image
                  src={image.toString()}
                  alt="profile"
                  width={1000}
                  height={1000}
                  className="object-cover w-16 h-16 rounded-full"
                  priority
                />
              ) : (
                <Image
                  src={user?.image_profile}
                  alt={'profile'}
                  width={1000}
                  height={1000}
                  className="object-cover rounded-full w-16 h-16"
                  priority
                />
              )}
            </label>
            <input
              onChange={handleImageChange}
              accept="image/*"
              type="file"
              name="postFile"
              id="postFile"
              className="hidden"
            />
            <label htmlFor="postFile" className="text-sm text-indigo-800 font-bold cursor-pointer">
              Edit picture
            </label>
          </div>
        </div>
      </>
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
        label="Negara"
        type="text"
        name="country"
        placeholder="Negara user"
        value={form.country}
        onChange={handleInputChange}
        required
      />

      <Input
        label="Kota"
        type="text"
        name="city"
        placeholder="Kota user"
        value={form.city}
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

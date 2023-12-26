import React, { useEffect, useState, useRef } from 'react'
import Dropdown from './Dropdown'
import Input from './Input'
import Modal from './Modal'
import { createNewCourse } from '@/utils/fetch'
import { useCategory } from '@/utils/swr'
import successAlert from '@/components/alert/successAlert'
import ToastSweet from '@/components/alert/ToastSweet'

export default function ModalCreateCourse({ onClose, token, mutate, setShowModal }) {
  const modalRef = useRef(null)

  const { categories } = useCategory(token)

  const [click, setClick] = useState(false)
  const [selectedOptions, setSelectedOptions] = useState({
    category: '',
    level: '',
    tipeKelas: '',
  })
  const [form, setForm] = useState({
    namaKelas: '',
    kodeKelas: '',
    harga: '',
    Materi: '',
    targetAudience: '',
    thumbnail: null,
  })

  const options = categories?.map((category) => ({ label: category.name, value: category._id }))

  const levelOptions = [
    { label: 'Level', value: 'Level' },
    { label: 'Beginner', value: 'Beginner' },
    { label: 'Intermediate', value: 'Intermediate' },
    { label: 'Advanced', value: 'Advanced' },
  ]

  const tipeKelasOptions = [
    { label: 'Tipe Kelas', value: 'tipekelas' },
    { label: 'FREE', value: 'FREE' },
    { label: 'PREMIUM', value: 'PREMIUM' },
  ]

  const handleSave = async (e) => {
    e.preventDefault()
    try {
      if (
        form.namaKelas.trim() === '' ||
        selectedOptions.category === '' ||
        form.kodeKelas.trim() === '' ||
        selectedOptions.tipeKelas === '' ||
        selectedOptions.level === '' ||
        form.harga === 0 ||
        form.Materi.trim() === ''
      ) {
        ToastSweet()
        return
      }

      const newCourseData = {
        title: form.namaKelas,
        description: form.Materi,
        classCode: form.kodeKelas,
        category: selectedOptions.category,
        level: selectedOptions.level,
        typeClass: selectedOptions.tipeKelas,
        level: selectedOptions.level,
        price: form.harga,
      }

      const response = await createNewCourse(token, newCourseData)
      console.log(response)

      if (response.ok) {
        setShowModal(false)
        mutate()
        successAlert('membuat', 'Course')
      }
    } catch (error) {
      console.error('Error creating or update course', error)
    }
  }

  const handleSelectChange = (event) => {
    const { name, value } = event.target
    setSelectedOptions({ ...selectedOptions, [name]: value })
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

  return (
    <Modal title={'Tambah Kelas'} onClose={onClose} nameButton={'Simpan'} handleSave={handleSave} modalRef={modalRef}>
      <Input
        type={'text'}
        label="Nama Kelas"
        name="namaKelas"
        placeholder="Nama Kelas"
        value={form.namaKelas}
        onChange={handleInputChange}
        required
      />
      <Input
        label="Kode Kelas"
        name="kodeKelas"
        placeholder="Kode Kelas"
        value={form.kodeKelas}
        onChange={handleInputChange}
        required
      />
      <Dropdown label="Category">
        <select
          name="category"
          value={selectedOptions.category}
          onChange={handleSelectChange}
          onClick={handleSelectClick}
          className={`select-dropdown ${
            selectedOptions.category == 'All' && click ? 'ring-fail' : selectedOptions.category ? 'ring-success' : ''
          }`}
        >
          {options?.map((option, index) => (
            <option key={index} value={option.value} className="text-[14px]">
              {option.label}
            </option>
          ))}
        </select>
      </Dropdown>
      <Dropdown label="Tipe Kelas">
        <select
          name="tipeKelas"
          value={selectedOptions.tipeKelas}
          onChange={handleSelectChange}
          onClick={handleSelectClick}
          className={`select-dropdown ${
            selectedOptions.tipeKelas == 'tipekelas' && click
              ? 'ring-fail'
              : selectedOptions.tipeKelas
              ? 'ring-success'
              : ''
          }`}
        >
          {tipeKelasOptions?.map((option, index) => (
            <option key={index} value={option.value} className="text-[14px]">
              {option.label}
            </option>
          ))}
        </select>
      </Dropdown>
      <Dropdown label="Level">
        <select
          name="level"
          value={selectedOptions.level}
          onChange={handleSelectChange}
          onClick={handleSelectClick}
          className={`select-dropdown ${
            selectedOptions.level == 'Level' && click ? 'ring-fail' : selectedOptions.level ? 'ring-success' : ''
          }`}
        >
          {levelOptions?.map((option, index) => (
            <option key={index} value={option.value} className="text-[14px]">
              {option.label}
            </option>
          ))}
        </select>
      </Dropdown>
      <Input
        type={'number'}
        label="Harga"
        name="harga"
        placeholder="0 untuk Free"
        value={form.harga}
        onChange={handleInputChange}
        required
      />
      <Input
        label="Materi"
        name="Materi"
        placeholder="Materi"
        value={form.Materi}
        onChange={handleInputChange}
        textarea
        required
      />
    </Modal>
  )
}

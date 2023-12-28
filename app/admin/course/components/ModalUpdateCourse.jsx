import React, { useEffect, useState, useRef } from 'react'
import Dropdown from './Dropdown'
import Input from './Input'
import Modal from './Modal'
import { updateCourse } from '@/utils/fetch'
import { useCategory, useCourse } from '@/utils/swr'
import successAlert from '@/components/alert/successAlert'
import ToastSweet from '@/components/alert/ToastSweet'

export default function ModalUpdateCourse({ onClose, token, courseId, mutate, setShowModal }) {
  const [click, setClick] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
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

  const modalRef = useRef(null)
  const { course } = useCourse(token, courseId, null, null)
  const { categories } = useCategory(token)

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

  useEffect(() => {
    if (course) {
      setForm({
        namaKelas: course.title,
        Materi: course.description,
        kodeKelas: course.classCode,
        harga: course.price,
        targetAudience: course.targetAudience,
        thumbnail: course.thumbnail,
      })
      setSelectedOptions({
        category: course.category._id,
        level: course.level,
        tipeKelas: course.typeClass,
      })
    }
  }, [course])

  const isDisabled =
    form.namaKelas.trim() === '' ||
    selectedOptions.category === '' ||
    form.kodeKelas.trim() === '' ||
    selectedOptions.tipeKelas === '' ||
    selectedOptions.level === '' ||
    form.harga === null ||
    form.Materi.trim() === ''

  const handleSave = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      if (isDisabled) {
        ToastSweet()
        return
      }

      const formData = new FormData()
      formData.append('title', form.namaKelas)
      formData.append('description', form.Materi)
      formData.append('classCode', form.kodeKelas)
      formData.append('category', selectedOptions.category)
      formData.append('level', selectedOptions.level)
      formData.append('typeClass', selectedOptions.tipeKelas)
      formData.append('price', Number(form.harga))
      formData.append('targetAudience', form.targetAudience)
      formData.append('thumbnail', form.thumbnail)

      const response = await updateCourse(token, courseId, formData)

      if (response.ok) {
        setShowModal(false)
        mutate()
        successAlert('edit', 'Course')
      }
    } catch (error) {
      console.error('Error  update course', error)
    } finally {
      setIsLoading(false)
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

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0]
    setForm((prevData) => ({
      ...prevData,
      thumbnail: imageFile,
    }))
  }

  const handleSelectClick = (e) => {
    setClick(true)
  }

  return (
    <Modal
      title={'Edit Kelas'}
      onClose={onClose}
      nameButton={'Perbarui'}
      isDisabled={isDisabled}
      isLoading={isLoading}
      handleSave={handleSave}
      modalRef={modalRef}
    >
      <>
        <div className="w-full mt-3">
          <label className="label-modal">Upload Gambar</label>
          <div className="input-modal-wrapper">
            <input
              type="file"
              accept="image/*"
              thumbnail="image"
              onChange={handleImageChange}
              className="input-modal"
            />
          </div>
        </div>
        <Input
          label="Target Audience"
          name="targetAudience"
          placeholder="Target Audience"
          value={form.targetAudience}
          onChange={handleInputChange}
          textarea
          required
        />
      </>
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
        value={selectedOptions.tipeKelas === 'FREE' ? '0' : form.harga}
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

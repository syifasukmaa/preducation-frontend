import React, { useEffect, useState, useRef } from 'react'
import { updateCourse } from '@/utils/fetch'
import { useCategory, useCourse } from '@/utils/swr'
import successAlert from '@/components/alert/successAlert'
import ToastSweet from '@/components/alert/ToastSweet'
import Modal from '@/components/Modal'
import Input from '@/components/input-form/Input'
import Dropdown from '@/components/input-form/Dropdown'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

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
    totalRating: 0,
  })

  const modalRef = useRef(null)
  const { data: course } = useCourse(token, courseId, null, null)
  const { data: categories } = useCategory(token)

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
        totalRating: course.totalRating,
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
    form.Materi.trim() === '' ||
    form.totalRating < 0 ||
    form.totalRating > 5

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
      formData.append('totalRating', form.totalRating)

      const response = await updateCourse(token, courseId, formData)

      if (response.ok) {
        setShowModal(false)
        mutate()
        successAlert('edit', 'Course')
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
          <label className="label-modal dark:text-dark-grey-02">Upload Gambar</label>
          <div className="input-modal-wrapper">
            <input
              type="file"
              accept="image/*"
              thumbnail="image"
              onChange={handleImageChange}
              className={`input-modal dark:text-dark-grey-02 ring-1 ring-dark-grey-02 `}
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
          className={`select-dropdown dark:bg-slate-300 ${
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
          className={`select-dropdown dark:bg-slate-300 ${
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
          className={`select-dropdown dark:bg-slate-300 ${
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
        type={'number'}
        label="Rating"
        name="totalRating"
        placeholder="Isi antara 0 sapai 5"
        value={form.totalRating}
        min={0}
        max={5}
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
      <ToastContainer />
    </Modal>
  )
}

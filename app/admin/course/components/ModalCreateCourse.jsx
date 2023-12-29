import React, { useEffect, useState, useRef } from 'react';
import Dropdown from './Dropdown';
import Input from './Input';
import Modal from './Modal';
import { createNewCourse } from '@/utils/fetch';
import { useCategory } from '@/utils/swr';
import successAlert from '@/components/alert/successAlert';
import ToastSweet from '@/components/alert/ToastSweet';

export default function ModalCreateCourse({ onClose, token, mutate, setShowModal }) {
  const [click, setClick] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState({
    category: '',
    level: '',
    tipeKelas: '',
  });
  const [form, setForm] = useState({
    namaKelas: '',
    kodeKelas: '',
    harga: '',
    Materi: '',
    targetAudience: '',
    thumbnail: null,
  });
  const modalRef = useRef(null);
  const { categories } = useCategory(token);

  const options = categories?.map((category) => ({ label: category.name, value: category._id }));

  const levelOptions = [
    { label: 'Level', value: 'Level' },
    { label: 'Beginner', value: 'Beginner' },
    { label: 'Intermediate', value: 'Intermediate' },
    { label: 'Advanced', value: 'Advanced' },
  ];

  const tipeKelasOptions = [
    { label: 'Tipe Kelas', value: 'tipekelas' },
    { label: 'FREE', value: 'FREE' },
    { label: 'PREMIUM', value: 'PREMIUM' },
  ];
  const isDisabled =
    form.namaKelas.trim() === '' ||
    selectedOptions.category === '' ||
    form.kodeKelas.trim() === '' ||
    selectedOptions.tipeKelas === '' ||
    selectedOptions.level === '' ||
    form.harga === null ||
    form.Materi.trim() === '';

  const handleSave = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (isDisabled) {
        ToastSweet();
        return;
      }

      const newCourseData = {
        title: form.namaKelas,
        description: form.Materi,
        classCode: form.kodeKelas,
        category: selectedOptions.category,
        level: selectedOptions.level,
        typeClass: selectedOptions.tipeKelas,
        level: selectedOptions.level,
        price: selectedOptions.tipeKelas === 'FREE' ? '0' : form.harga,
      };

      const response = await createNewCourse(token, newCourseData);

      if (response.ok) {
        setShowModal(false);
        mutate();
        successAlert('membuat', 'Course');
      }
    } catch (error) {
      console.error('Error creating or update course', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectChange = (event) => {
    const { name, value } = event.target;
    setSelectedOptions({ ...selectedOptions, [name]: value });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setForm((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelectClick = (e) => {
    setClick(true);
  };
  console.log(form.harga);

  return (
    <Modal
      title={'Tambah Kelas'}
      onClose={onClose}
      nameButton={'Simpan'}
      isDisabled={isDisabled}
      isLoading={isLoading}
      handleSave={handleSave}
      modalRef={modalRef}
    >
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
            <option
              key={index}
              value={option.value}
              className="text-[14px]"
            >
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
          className={`select-dropdown dark:bg-slate-300  ${
            selectedOptions.tipeKelas == 'tipekelas' && click
              ? 'ring-fail'
              : selectedOptions.tipeKelas
              ? 'ring-success'
              : ''
          }`}
        >
          {tipeKelasOptions?.map((option, index) => (
            <option
              key={index}
              value={option.value}
              className="text-[14px]"
            >
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
          className={`select-dropdown dark:bg-slate-300  ${
            selectedOptions.level == 'Level' && click ? 'ring-fail' : selectedOptions.level ? 'ring-success' : ''
          }`}
        >
          {levelOptions?.map((option, index) => (
            <option
              key={index}
              value={option.value}
              className="text-[14px]"
            >
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
  );
}

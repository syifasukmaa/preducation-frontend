import React, { useEffect, useState } from 'react';
import Dropdown from './Dropdown';
import Input from './Input';
import Modal from './Modal';
import { createNewCourse, updateCourse } from '@/utils/fetch';
import { useCourse } from '@/utils/swr';

export default function ModalCourse({ onClose, editMode, token, courseId, mutate }) {
  const { course } = useCourse(token, courseId, null, null);

  const [selectedOption, setSelectedOption] = useState('');

  const [formData, setFormData] = useState({
    namaKelas: '',
    kodeKelas: '',
    tipeKelas: '',
    level: '',
    harga: 0,
    Materi: '',
    targetAudience: '',
    thumbnail: null,
  });

  useEffect(() => {
    if (editMode && course) {
      setFormData({
        namaKelas: course.title,
        Materi: course.description,
        kodeKelas: course.classCode,
        tipeKelas: course.typeClass,
        level: course.level,
        harga: course.price,
        targetAudience: course.targetAudience,
        thumbnail: course.thumbnail,
      });
      setSelectedOption(course.category._id);
    }
  }, [editMode, course]);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      let newCourseData = {
        title: formData.namaKelas,
        description: formData.Materi,
        classCode: formData.kodeKelas,
        category: selectedOption,
        typeClass: formData.tipeKelas,
        level: formData.level,
        price: formData.harga,
      };

      if (editMode) {
        const updatedImage = formData.thumbnail !== course.thumbnail ? formData.thumbnail : course.thumbnail;
        newCourseData = {
          ...newCourseData,
          thumbnail: updatedImage,
        };

        const updatedTargetAudience =
          formData.targetAudience !== course.targetAudience ? formData.targetAudience : course.targetAudience;
        newCourseData = {
          ...newCourseData,
          targetAudience: updatedTargetAudience,
        };

        const response = await updateCourse(token, courseId, newCourseData);

        if (response.ok) {
          mutate();
        }
        console.log(newCourseData);
        console.log(response);
      } else {
        const response = await createNewCourse(token, newCourseData);

        if (response.ok) {
          mutate();
        }
        console.log(response);
        console.log(newCourseData);
      }
    } catch (error) {
      console.error('Error creating a new course:', error);
    }
  };

  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
    console.log(selectedOption);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      thumbnail: imageFile.name,
    }));
  };

  const options = [
    { label: 'Category', value: 'judul' },
    { label: 'UI/UX Design', value: '6569b03463e7a9d96bbe4fc6' },
    { label: 'Data Science', value: '6569b03463e7a9d96bbe4fcb' },
    { label: 'Web Development', value: '6569b03463e7a9d96bbe4fc8' },
    { label: 'Android Development', value: '6569b03463e7a9d96bbe4fc9' },
    { label: 'IOS Development', value: '6569b03463e7a9d96bbe4fca' },
    { label: 'Product Management', value: '6569b03463e7a9d96bbe4fc7' },
  ];

  return (
    <Modal
      title={editMode ? 'Edit Kelas' : 'Tambah Kelas'}
      onClose={onClose}
      nameButton={editMode ? 'Perbarui' : 'Simpan'}
      handleSave={handleSave}
    >
      {editMode && (
        <>
          <div className="mt-3 w-full">
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
            value={formData.targetAudience}
            onChange={handleInputChange}
            textarea
          />
        </>
      )}
      <Input
        type={'text'}
        label="Nama Kelas"
        name="namaKelas"
        placeholder="Nama Kelas"
        value={formData.namaKelas}
        onChange={handleInputChange}
      />
      <Dropdown
        value={selectedOption}
        onChange={handleSelectChange}
        options={options}
      />
      <Input
        label="Kode Kelas"
        name="kodeKelas"
        placeholder="Kode Kelas"
        value={formData.kodeKelas}
        onChange={handleInputChange}
      />
      <Input
        type={'text'}
        label="Tipe Kelas"
        name="tipeKelas"
        placeholder="Tipe Kelas"
        value={formData.tipeKelas}
        onChange={handleInputChange}
      />
      <Input
        type={'text'}
        label="Level"
        name="level"
        placeholder="Level"
        value={formData.level}
        onChange={handleInputChange}
      />
      <Input
        type={'number'}
        label="Harga"
        name="harga"
        placeholder="Harga"
        value={formData.harga}
        onChange={handleInputChange}
        l
      />
      <Input
        label="Materi"
        name="Materi"
        placeholder="Materi"
        value={formData.Materi}
        onChange={handleInputChange}
        textarea
      />
    </Modal>
  );
}

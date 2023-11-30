import React, { useState } from 'react';
import Dropdown from './Dropdown';
import Input from './Input';
import Modal from './Modal';

export default function ModalCourse({ onClose, editMode }) {
  const [selectedOption, setSelectedOption] = useState('');

  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const [formData, setFormData] = useState({
    namaKelas: '',
    kodeKelas: '',
    tipeKelas: '',
    level: '',
    harga: 0,
    Materi: '',
    Thumbnail: null,
  });

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
      image: imageFile,
    }));
  };

  const options = [
    { label: 'UI/UX Design', value: 'jenis1' },
    { label: 'Web Development', value: 'jenis2' },
    { label: 'Android Development', value: 'jenis3' },
    { label: 'Product Management', value: 'jenis4' },
  ];

  return (
    <Modal
      title={editMode ? 'Edit Kelas' : 'Tambah Kelas'}
      onClose={onClose}
      nameButton={editMode ? 'Perbarui' : 'Simpan'}
    >
      {editMode && (
        <div className="mt-3 w-full">
          <label className="label-modal">Upload Gambar</label>
          <div className="input-modal-wrapper">
            <input
              type="file"
              accept="image/*"
              name="image"
              onChange={handleImageChange}
              className="input-modal"
            />
          </div>
        </div>
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
        name="materi"
        placeholder="Materi"
        textarea
      />
    </Modal>
  );
}

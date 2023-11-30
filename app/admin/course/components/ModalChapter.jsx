import React, { useState } from 'react';
import Modal from './Modal';
import Input from './Input';

export default function ModalChapter({ onClose, editMode }) {
  const [formData, setFormData] = useState({
    namaChapter: '',
    totaldurasi: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  return (
    <Modal
      title={editMode ? 'Edit Chapter' : 'Tambah Chapter'}
      onClose={onClose}
      nameButton={editMode ? 'Perbarui' : 'Simpan'}
    >
      <Input
        type={'text'}
        label="Nama Chapter"
        name="namaChapter"
        placeholder="Nama Chapter"
        value={formData.namaChapter}
        onChange={handleInputChange}
      />
      <Input
        type={'number'}
        label="Total Durasi"
        name="totaldurasi"
        placeholder="Total Durasi"
        value={formData.totaldurasi}
        onChange={handleInputChange}
      />
    </Modal>
  );
}

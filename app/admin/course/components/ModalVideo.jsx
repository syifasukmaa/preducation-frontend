'use client';
import React, { useState } from 'react';
import Modal from './Modal';
import Input from './Input';

export default function ModalVideo({ onClose, editMode }) {
  const [formData, setFormData] = useState({
    namaVideo: '',
    durasi: 0,
    videoUrl: '',
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
      title={editMode ? 'Edit Video' : 'Tambah Video'}
      onClose={onClose}
      nameButton={editMode ? 'Perbarui' : 'Simpan'}
    >
      <Input
        type={'text'}
        label="Nama Video"
        name="namaVideo"
        placeholder="Nama Video"
        value={formData.namaVideo}
        onChange={handleInputChange}
      />
      <Input
        type={'number'}
        label="Durasi"
        name="durasi"
        placeholder="Durasi"
        value={formData.durasi}
        onChange={handleInputChange}
      />
      <Input
        type={'text'}
        label="Video Url"
        name="videoUrl"
        placeholder="Video Url"
        value={formData.videoUrl}
        onChange={handleInputChange}
      />
    </Modal>
  );
}

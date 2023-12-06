import React, { useState } from 'react';
import Modal from './Modal';
import Input from './Input';
import { createNewChapter } from '@/utils/fetch';

export default function ModalChapter({ onClose, editMode, token, Id, mutate }) {
  const [titleChapter, setTitleChapter] = useState('');

  const handleInputChange = (e) => {
    setTitleChapter(e.target.value);
  };
  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const chapterData = { title: titleChapter };

      const response = await createNewChapter(token, chapterData, Id);

      if (response.ok) {
        alert('Sukses Membuat Capther Baru');
        setTitleChapter('');
        mutate();
      }
    } catch (err) {
      console.error('Error creating or update chapter', err);
    }
  };
  return (
    <Modal
      title={editMode ? 'Edit Chapter' : 'Tambah Chapter'}
      onClose={onClose}
      nameButton={editMode ? 'Perbarui' : 'Simpan'}
      handleSave={handleSave}
    >
      <Input
        type={'text'}
        label="Nama Chapter"
        name="namaChapter"
        placeholder="Nama Chapter"
        value={titleChapter}
        onChange={handleInputChange}
      />
    </Modal>
  );
}

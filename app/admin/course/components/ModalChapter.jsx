import React, { useState, useEffect, useRef } from 'react';
import Modal from './Modal';
import Input from './Input';
import { createNewChapter, updateChapter } from '@/utils/fetch';
import { useChapter } from '@/utils/swr';

export default function ModalChapter({ onClose, editMode, token, Id, mutate }) {
  const modalRef = useRef(null);
  const [titleChapter, setTitleChapter] = useState('');

  const { chapter, isLoding, mutate: singleMutate } = useChapter(token, Id);

  useEffect(() => {
    if (editMode && chapter) {
      setTitleChapter(chapter.title);
    }
  }, [editMode, chapter]);

  const handleInputChange = (e) => {
    setTitleChapter(e.target.value);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const chapterData = { title: titleChapter };

      if (editMode) {
        setTitleChapter(chapter.title);
        const response = await updateChapter(token, chapterData, Id);
        if (response.ok) {
          alert('Sukses Edit Capther');
          setTitleChapter('');
          singleMutate();
        }
      } else {
        const response = await createNewChapter(token, chapterData, Id);

        if (response.ok) {
          alert('Sukses Membuat Capther Baru');
          setTitleChapter('');
          mutate();
        }
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
      modalRef={modalRef}
    >
      <Input
        type={'text'}
        label="Nama Chapter"
        name="namaChapter"
        placeholder="Nama Chapter"
        value={titleChapter}
        onChange={handleInputChange}
        required
      />
    </Modal>
  );
}

import React, { useState, useEffect, useRef } from 'react';
import Modal from './Modal';
import Input from './Input';
import { createNewChapter, updateChapter } from '@/utils/fetch';
import { useChapter } from '@/utils/swr';
import successAlert from '@/components/alert/successAlert';
import ToastSweet from '@/components/alert/ToastSweet';

export default function ModalChapter({ onClose, editMode, token, Id, mutate, setShowModal }) {
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
      if (titleChapter === '') {
        ToastSweet();
        return;
      }

      const chapterData = { title: titleChapter };

      if (editMode) {
        setTitleChapter(chapter.title);
        const response = await updateChapter(token, chapterData, Id);
        if (response.ok) {
          successAlert('edit', 'Chapter');
          setTitleChapter('');
          singleMutate();
        }
      } else {
        const response = await createNewChapter(token, chapterData, Id);
        if (response.ok) {
          setShowModal(false);
          mutate();
          successAlert('membuat', 'Chapter');
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

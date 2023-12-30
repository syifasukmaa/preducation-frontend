import React, { useState, useEffect, useRef } from 'react';
import Modal from './Modal';
import Input from './Input';
import { createNewChapter, updateChapter } from '@/utils/fetch';
import { useChapter } from '@/utils/swr';
import successAlert from '@/components/alert/successAlert';
import ToastSweet from '@/components/alert/ToastSweet';

export default function ModalChapter({ onClose, editMode, token, Id, mutate, setShowModal }) {
  const [titleChapter, setTitleChapter] = useState('');
  const [loading, setLoading] = useState(false);
  const modalRef = useRef(null);

  const { chapter } = useChapter(token, Id);

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
    setLoading(true);
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
          mutate();
          successAlert('edit', 'Chapter');
          setTitleChapter('');
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
    } finally {
      setLoading(false);
    }
  };
  const isDisabled = titleChapter.length === 0;
  return (
    <Modal
      title={editMode ? 'Edit Chapter' : 'Tambah Chapter'}
      onClose={onClose}
      nameButton={editMode ? 'Perbarui' : 'Simpan'}
      handleSave={handleSave}
      modalRef={modalRef}
      isLoading={loading}
      isDisabled={isDisabled}
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

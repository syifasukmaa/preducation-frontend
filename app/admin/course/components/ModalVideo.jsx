'use client';
import React, { useState, useEffect, useRef } from 'react';
import Modal from './Modal';
import Input from './Input';
import { useChapter } from '@/utils/swr';
import { createNewVideo, updateVideo } from '@/utils/fetch';
import successAlert from '@/components/alert/successAlert';

export default function ModalVideo({ onClose, editMode, token, Id, mutate, chapterId, setShowModal }) {
  const modalRef = useRef(null);

  const [formData, setFormData] = useState({
    namaVideo: '',
    durasi: 0,
    index: 0,
    videoUrl: '',
  });

  const { chapter, isLoading, mutate: singleMutate } = useChapter(token, chapterId);
  useEffect(() => {
    if (editMode && chapter && chapter.videos) {
      const video = chapter.videos.find((video) => video._id === Id);
      setFormData({
        namaVideo: video.title,
        durasi: video.duration,
        index: video.index,
        videoUrl: video.videoUrl,
      });
    }
  }, [editMode, chapter]);

  const handleSave = async (e) => {
    e.preventDefault();

    const videoData = {
      title: formData.namaVideo,
      duration: formData.durasi,
      index: formData.index,
      videoUrl: formData.videoUrl,
    };

    if (editMode) {
      const response = await updateVideo(token, videoData, Id);
      if (response.ok) {
        alert('Berhasil edit data video');
        setTimeout(() => {
          setFormData({
            namaVideo: '',
            durasi: '',
            index: '',
            videoUrl: '',
          });
        }, 1000);
        singleMutate();
      }
    } else {
      const response = await createNewVideo(token, videoData, Id);
      if (response.ok) {
        setShowModal(false);
        mutate();
        successAlert('Video');
      }
    }
  };

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
      handleSave={handleSave}
      modalRef={modalRef}
    >
      <Input
        type={'text'}
        label="Nama Video"
        name="namaVideo"
        placeholder="Nama Video"
        value={formData.namaVideo}
        onChange={handleInputChange}
        required
      />
      <Input
        type={'number'}
        label="Durasi"
        name="durasi"
        placeholder="Durasi"
        value={formData.durasi}
        onChange={handleInputChange}
        required
      />
      <Input
        type={'number'}
        label="Index"
        name="index"
        placeholder="Index Video"
        value={formData.index}
        onChange={handleInputChange}
        required
      />
      <Input
        type={'text'}
        label="Video Url"
        name="videoUrl"
        placeholder="Video Url"
        value={formData.videoUrl}
        onChange={handleInputChange}
        required
      />
    </Modal>
  );
}

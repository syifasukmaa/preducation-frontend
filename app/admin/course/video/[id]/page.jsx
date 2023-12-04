'use client';
import ActionButton from '@/components/button/ActionButton';
import AddButton from '@/components/button/AddButton';
import SearchButton from '@/components/button/SearchButton';
import SearchPopup from '@/components/popup/SearchPopup';
import Videos from '@/data/Videodummy.json';
import ModalVideo from '../../components/ModalVideo';
import { MdDeleteOutline } from 'react-icons/md';
import { MdUpgrade } from 'react-icons/md';

import React, { useState } from 'react';

export default function page() {
  const [showElements, setShowElements] = useState({
    showInput: false,
  });

  const [editMode, setEditMode] = useState(false);

  const [showModal, setShowModal] = useState(false);

  const handleEditChapter = () => {
    setEditMode(true);
    setShowModal(true);
  };

  const handleAddChapter = () => {
    setEditMode(false);
    setShowModal(true);
  };

  return (
    <div className={`md:px-12 px-4`}>
      <div className="md:pt-2 flex items-center justify-between relative">
        <p className="text-xl font-bold">Kelola Kelas</p>
        <div className="flex items-center relative">
          <AddButton onClick={() => handleAddChapter()} />

          <SearchButton
            onClick={() =>
              setShowElements({ ...showElements, showInput: true })
            }
          />

          {showElements.showInput && (
            <SearchPopup
              onClick={() =>
                setShowElements({ ...showElements, showInput: false })
              }
            />
          )}
        </div>
      </div>

      <div className="overflow-x-auto mt-4 mb-24 lg:mb-32 md:mt-6">
        <div className="overflow-y-auto">
          <table className="min-w-full bg-white rounded-lg">
            <thead className="bg-orange-04 font-semibold text-neutral-05 text-xs">
              <tr className="">
                <td className="py-3 px-4">Id</td>
                <td className="py-3 px-4">Nama Video</td>
                <td className="py-3 px-4">Total Durasi</td>
                <td className="py-3 px-4">Video</td>
                <td className="py-3 px-4">Aksi</td>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-[10px]">
              {Videos.map((video) => {
                const youtubetUrl = video.url;
                const splitUrl = youtubetUrl.split('/');
                const url = splitUrl[splitUrl.length - 1];

                return (
                  <tr
                    key={video.id}
                    className=" border-y border-orange-04"
                  >
                    <td className="p-4 font-bold text-gray-05">{video.id}</td>
                    <td className="p-4 font-bold text-gray-04">{video.nama}</td>
                    <td className="p-4 font-bold text-gray-04">
                      {video.durasi} min
                    </td>
                    <td
                      className="py-3 px-4 font-bold text-gray-04 
                    lg:whitespace-nowrap whitespace-pre-wrap"
                    >
                      <iframe
                        className="w-full h-full"
                        src={`https://www.youtube.com/embed/${url}`}
                        title="YouTube video player"
                        allow="autoplay; clipboard-write; encrypted-media;  picture-in-picture"
                        allowFullScreen
                      ></iframe>
                      <span className="mt-2 lg:flex">
                        <p>Link Youtube:</p>
                        <a
                          href={url}
                          target="_blank"
                          className="underline text-dark-blue-03 hover:text-dark-blue-05"
                        >
                          {youtubetUrl}
                        </a>
                      </span>
                    </td>
                    <td className="py-3 px-4 font-bold">
                      <button className=" bg-light-green  text-white mr-2 mb-2 px-1 py-1 rounded">
                        <MdUpgrade size={20} />
                      </button>
                      <button className=" bg-alert-red text-white mr-2 mb-2  px-1 py-1 rounded">
                        <MdDeleteOutline size={20} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <ModalVideo
          onClose={() => setShowModal(false)}
          editMode={editMode}
        />
      )}
    </div>
  );
}

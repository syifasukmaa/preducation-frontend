'use client';
import React, { useState } from 'react';
import ActionButton from '@/components/button/ActionButton';
import AddButton from '@/components/button/AddButton';
import SearchButton from '@/components/button/SearchButton';
import SearchPopup from '@/components/popup/SearchPopup';
import Videos from '@/data/Videodummy.json';
import ModalVideo from '../../components/ModalVideo';
import { MdDeleteOutline } from 'react-icons/md';
import { MdUpgrade } from 'react-icons/md';
import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation';
import { useChapter } from '@/utils/swr';
import { deleteVideo } from '@/utils/fetch';

export default function page() {
  const params = useParams();
  const idChapter = params.id;

  const { data: session } = useSession();
  const token = session?.user?.accessToken;

  const [showElements, setShowElements] = useState({
    showInput: false,
  });

  const [Id, setId] = useState(null);

  const { chapter, mutate } = useChapter(token, idChapter);

  const [editMode, setEditMode] = useState(false);

  const [showModal, setShowModal] = useState(false);

  const handleEditVideo = (id) => {
    setEditMode(true);
    setShowModal(true);
    setId(id);
  };

  const handleAddVideo = (id) => {
    setEditMode(false);
    setShowModal(true);
    setId(id);
  };

  const handleDeleteVideo = async (id) => {
    const response = await deleteVideo(token, id);
    if (response.ok) mutate();
  };

  return (
    <div className={`md:px-12 px-4`}>
      <div className="md:pt-2 flex items-center justify-between relative">
        <p className="text-xl font-bold">Kelola Kelas</p>
        <div className="flex items-center relative">
          <AddButton onClick={() => handleAddVideo(idChapter)} />

          <SearchButton onClick={() => setShowElements({ ...showElements, showInput: true })} />

          {showElements.showInput && (
            <SearchPopup onClick={() => setShowElements({ ...showElements, showInput: false })} />
          )}
        </div>
      </div>

      <div className="overflow-x-auto mt-4 mb-24 lg:mb-32 md:mt-6">
        <div className="overflow-y-auto">
          <table className="min-w-full bg-white rounded-lg">
            <thead className="bg-orange-04 font-semibold text-neutral-05 text-xs">
              <tr className="">
                <th className="text-left p-4">No</th>
                <th className="text-left p-4">Nama Video</th>
                <th className="text-left p-4">Total Durasi</th>
                <th className="text-left p-4">Index</th>
                <th className="text-left py-3 px-4">Video</th>
                <th className="text-left py-3 px-4">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-[10px]">
              {chapter &&
                chapter.videos &&
                chapter.videos.map((video, index) => {
                  const youtubetUrl = video.videoUrl;
                  const splitUrl = youtubetUrl.split('/');
                  const url = splitUrl[splitUrl.length - 1];

                  return (
                    <tr
                      key={video._id}
                      className=" border-y border-orange-04"
                    >
                      <td className="p-4 font-bold text-gray-05">{index + 1}</td>
                      <td className="p-4 font-bold text-gray-04">{video.title}</td>
                      <td className="p-4 font-bold text-gray-04">{video.duration} min</td>
                      <td className="p-4 font-bold text-gray-04">{video.index}</td>
                      <td className="py-3 px-4 font-bold text-gray-04">
                        <iframe
                          className="w-full h-full"
                          src={`https://www.youtube.com/embed/${url}`}
                          title="YouTube video player"
                          allow="autoplay; clipboard-write; encrypted-media; fullscreen; gryscope; picture-in-picture"
                        ></iframe>
                        <span className="mt-2 lg:flex">
                          <p>Link Youtube:</p>
                          <a
                            href={url}
                            target="_blank"
                            className="underline text-dark-blue-03 hover:text-dark-blue-05"
                          >
                            {video.videoUrl}
                          </a>
                        </span>
                      </td>
                      <td className="py-3 px-4 font-bold">
                        <button
                          className=" bg-light-green  text-white mr-2 mb-2 px-1 py-1 rounded"
                          onClick={() => handleEditVideo(video._id)}
                        >
                          <MdUpgrade size={20} />
                        </button>
                        <button
                          className=" bg-alert-red text-white mr-2 mb-2  px-1 py-1 rounded"
                          onClick={() => handleDeleteVideo(video._id)}
                        >
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
          token={token}
          mutate={mutate}
          Id={Id}
          chapterId={idChapter}
        />
      )}
    </div>
  );
}

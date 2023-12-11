'use client';
import React, { useState } from 'react';
import ActionButton from '@/components/button/ActionButton';
import { useParams } from 'next/navigation';
import AddButton from '@/components/button/AddButton';
import SearchButton from '@/components/button/SearchButton';
import SearchPopup from '@/components/popup/SearchPopup';
import ModalVideo from '../../components/ModalVideo';
import VideoLoading from '@/components/loading/VideoLoading';
import { MdDeleteOutline } from 'react-icons/md';
import { MdUpgrade } from 'react-icons/md';
import { useSession } from 'next-auth/react';
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

  const { chapter, mutate, isLoading, error } = useChapter(token, idChapter);

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
      <div className="relative flex items-center justify-between md:pt-2">
        <p className="text-xl font-bold">Kelola Kelas</p>
        <div className="relative flex items-center">
          <AddButton onClick={() => handleAddVideo(idChapter)} />

          <SearchButton onClick={() => setShowElements({ ...showElements, showInput: true })} />

          {showElements.showInput && (
            <SearchPopup onClick={() => setShowElements({ ...showElements, showInput: false })} />
          )}
        </div>
      </div>

      <div className="mt-4 mb-24 overflow-x-auto lg:mb-32 md:mt-6">
        <div className="overflow-y-auto">
          <table className="min-w-full bg-white rounded-lg">
            <thead className="text-xs font-semibold bg-orange-04 text-neutral-05">
              <tr className="">
                <th className="p-4 text-left">No</th>
                <th className="p-4 text-left">Nama Video</th>
                <th className="p-4 text-left">Total Durasi</th>
                <th className="p-4 text-left">Index</th>
                <th className="px-4 py-3 text-left">Video</th>
                <th className="px-4 py-3 text-left">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-[10px]">
              {isLoading ? (
                <>
                  {[...Array(3)].map((_, index) => (
                    <VideoLoading key={index} />
                  ))}
                </>
              ) : error ? (
                <tr>
                  <td
                    colSpan="7"
                    className="py-8 text-center"
                  >
                    <div className="flex items-center justify-center">
                      <span>{`Error: ${error}`}</span>
                    </div>
                  </td>
                </tr>
              ) : chapter && chapter.videos ? (
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
                      <td className="px-4 py-3 font-bold text-gray-04">
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
                      <td className="px-4 py-3 font-bold">
                        <button
                          className="px-1 py-1 mb-2 mr-2 text-white rounded bg-light-green"
                          onClick={() => handleEditVideo(video._id)}
                        >
                          <MdUpgrade size={20} />
                        </button>
                        <button
                          className="px-1 py-1 mb-2 mr-2 text-white rounded bg-alert-red"
                          onClick={() => handleDeleteVideo(video._id)}
                        >
                          <MdDeleteOutline size={20} />
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                [...Array(3)].map((_, index) => <VideoLoading key={index} />)
              )}
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

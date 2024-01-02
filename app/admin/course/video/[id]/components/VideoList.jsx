import React from 'react'
import { MdDeleteOutline, MdUpgrade } from 'react-icons/md'

const VideoList = ({ video, handleDeleteVideo, handleEditVideo, index }) => {
  const youtubetUrl = video.videoUrl
  const splitUrl = youtubetUrl.split('/')
  const url = splitUrl[splitUrl.length - 1]
  return (
    <tr key={video._id} className=" border-y border-orange-04 dark:border-dark-grey-05">
      <td className="p-4 text-xs font-bold text-gray-05 dark:text-dark-grey-02">{index + 1}</td>
      <td className="p-4 text-xs font-bold text-gray-04 dark:text-dark-grey-02">{video.title}</td>
      <td className="p-4 text-xs font-bold text-gray-04 dark:text-dark-grey-02">{video.duration} min</td>
      <td className="p-4 text-xs font-bold text-gray-04 dark:text-dark-grey-02">{video.index}</td>
      <td className="px-4 py-3 text-xs font-bold text-gray-04 dark:text-dark-grey-02">
        <iframe
          className="w-full h-full"
          src={`https://www.youtube.com/embed/${url}`}
          title="YouTube video player"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        ></iframe>
        <span className="mt-3 lg:flex">
          <p>Link Youtube : </p>
          <a href={url} target="_blank" className="no-underline text-orange-05 hover:text-dark-blue-05">
            {video.videoUrl}
          </a>
        </span>
      </td>
      <td className="px-4 py-3 text-xs font-bold">
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
  )
}

export default VideoList

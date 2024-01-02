import ActionButton from '@/components/button/ActionButton'
import React from 'react'

const ChapterList = ({ chapter, handleEditChapter, handleDeleteChapter, goToChapter, index }) => {
  return (
    <tr key={chapter._id}>
      <td className="px-4 py-4 text-xs font-bold text-gray-05 dark:text-dark-grey-02">{index + 1}</td>
      <td className="px-4 py-4 text-xs font-bold text-gray-04 dark:text-dark-grey-02">{chapter.title}</td>
      <td className="px-4 py-4 text-xs font-bold text-gray-04 dark:text-dark-grey-02">{chapter.totalDuration}</td>
      <td className="px-4 py-3 text-xs font-bold whitespace-pre-wrap text-gray-04 lg:whitespace-nowrap">
        {chapter.videos?.map((link, index) => (
          <div key={link._id} className="text-orange-05">
            <a href={link.videoUrl} target="_blank" className="hover:text-dark-blue-05">
              {link.videoUrl}
            </a>
          </div>
        ))}
      </td>
      <td className="grid px-4 py-3 text-xs font-bold xl:grid-cols-3">
        <ActionButton
          styles={'bg-secondary-dark-blue hover:border-secondary-dark-blue py-2'}
          onClick={() => goToChapter(chapter._id)}
        >
          Video
        </ActionButton>
        <ActionButton
          styles={'bg-light-green hover:border-light-green py-2'}
          onClick={() => handleEditChapter(chapter._id)}
        >
          Ubah
        </ActionButton>
        <ActionButton
          styles={'bg-alert-red hover:border-alert-red py-2'}
          onClick={() => handleDeleteChapter(chapter._id)}
        >
          Hapus
        </ActionButton>
      </td>
    </tr>
  )
}

export default ChapterList

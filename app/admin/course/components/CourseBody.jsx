import ActionButton from '@/components/button/ActionButton'
import { formatToCurrency } from '@/utils/convert'
import React from 'react'

const CourseBody = ({ course, index, goToCourseDetail, handleDeleteCourse }) => {
  return (
    <tr key={course._id}>
      <td className="px-4 py-4 text-xs font-bold text-gray-05 dark:text-dark-grey-02">{course.classCode}</td>
      <td className="py-3 px-4 text-xs font-bold text-gray-05 w-[10%] dark:text-dark-grey-02">
        {course.category.name}
      </td>
      <td className="py-3 px-4 text-xs font-bold text-gray-04 lg:w-[25%] whitespace-pre-wrap dark:text-dark-grey-02">
        {course.title}
      </td>
      <td
        className={`py-3 px-4 text-xs font-bold ${
          course.typeClass === 'PREMIUM' ? 'text-orange-05' : 'text-alert-green'
        }`}
      >
        {course.typeClass}
      </td>
      <td className="py-3 px-4 text-xs font-bold text-black dark:text-dark-grey-02 w-[12%]">{course.level}</td>
      <td className="px-4 py-3 text-xs font-bold text-black dark:text-dark-grey-02">
        {formatToCurrency(course.price)}
      </td>
      <td className="grid px-4 py-3 text-xs font-bold xl:grid-cols-2">
        <ActionButton
          styles={'bg-light-green hover:border-light-green py-2'}
          onClick={() => goToCourseDetail(course._id)}
          testId={index}
        >
          Detail
        </ActionButton>
        <ActionButton
          styles={'bg-alert-red hover:border-alert-red py-2'}
          onClick={() => handleDeleteCourse(course._id)}
        >
          Hapus
        </ActionButton>
      </td>
    </tr>
  )
}

export default CourseBody

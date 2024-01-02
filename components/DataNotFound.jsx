import Image from 'next/image'
import React from 'react'

const DataNotFound = () => {
  return (
    <tr>
      <td colSpan="7" className="py-8 text-center">
        <div className="flex flex-col items-center justify-center min-h-[200px] md:items-start md:flex-row">
          <Image
            src="/img/empty_3d.jpg"
            width={80}
            height={80}
            alt="empty image"
            className="w-[80px] h-[80px] mt-2"
            priority="true"
          />
          <div className="ml-4 md:text-start">
            <p className="mt-4 text-xl font-bold text-orange-05">Data tidak ditemukan</p>
          </div>
        </div>
      </td>
    </tr>
  )
}

export default DataNotFound

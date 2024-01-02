import React from 'react'

const ErrorData = ({ error }) => {
  return (
    <tr>
      <td colSpan="7" className="py-8 text-center">
        <div className="flex items-center justify-center">
          <span>{`Error: ${error}`}</span>
        </div>
      </td>
    </tr>
  )
}

export default ErrorData

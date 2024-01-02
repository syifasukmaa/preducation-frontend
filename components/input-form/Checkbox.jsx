import React from 'react'

export default function Checkbox({ label, checked, onChange }) {
  return (
    <div className="flex items-center">
      <input type="checkbox" className="w-5 h-5 text-blue-500 form-checkbox " checked={checked} onChange={onChange} />
      <span className="ml-2 font-medium text-orange-05">{label}</span>
    </div>
  )
}

import Checkbox from '@/components/input-form/Checkbox'
import FilterPopup from '@/components/popup/FilterPopup'
import React, { useEffect, useRef } from 'react'

const FilterCourse = ({ selectedCategories, handleCheckboxChange, setShowElements, showElements }) => {
  const overLay = useRef(null)
  const handleOutsideClick = (e) => {
    if (!overLay.current.contains(e.target)) {
      setShowElements({ showFilter: false })
    }
  }

  useEffect(() => {
    if (showElements.showFilter) {
      document.addEventListener('mousedown', handleOutsideClick)
    } else {
      document.removeEventListener('mousedown', handleOutsideClick)
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [showElements.showFilter])
  return (
    <div className="absolute right-0 z-30 top-12" ref={overLay}>
      <FilterPopup clickClose={() => setShowElements({ ...showElements, showFilter: false })}>
        <Checkbox
          label="Data Science"
          checked={selectedCategories['Data Science']}
          onChange={() => handleCheckboxChange('Data Science')}
        />
        <Checkbox
          label="Web Development"
          checked={selectedCategories['Web Development']}
          onChange={() => handleCheckboxChange('Web Development')}
        />
        <Checkbox
          label="Android Development"
          checked={selectedCategories['Android Development']}
          onChange={() => handleCheckboxChange('Android Development')}
        />
        <Checkbox
          label="IOS Development"
          checked={selectedCategories['IOS Development']}
          onChange={() => handleCheckboxChange('IOS Development')}
        />
        <Checkbox
          label="UI/UX Design"
          checked={selectedCategories['UI/UX Design']}
          onChange={() => handleCheckboxChange('UI/UX Design')}
        />
        <Checkbox
          label="Product Management"
          checked={selectedCategories['Product Management']}
          onChange={() => handleCheckboxChange('Product Management')}
        />
      </FilterPopup>
    </div>
  )
}

export default FilterCourse

import FilterPopup from '@/components/popup/FilterPopup'
import React, { useEffect, useRef } from 'react'

const FilterPayment = ({ handleCloseFilter, filterCourses, showElements, setShowElements }) => {
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
      <FilterPopup clickClose={handleCloseFilter}>
        <div data-testid="paid-button" className="item-filter" onClick={() => filterCourses('Paid')}>
          SUDAH BAYAR
        </div>

        <div data-testid="onprogress-button" className="item-filter" onClick={() => filterCourses('On Progress')}>
          BELUM BAYAR
        </div>
      </FilterPopup>
    </div>
  )
}

export default FilterPayment

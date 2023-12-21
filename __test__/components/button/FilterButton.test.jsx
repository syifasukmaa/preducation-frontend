import FilterButton from '@/components/button/FilterButton'
import { render } from '@testing-library/react'

describe('Filter Button component', () => {
  it('Should renders button with the correct styles', () => {
    const testClassName =
      'flex items-center border-[1px] border-orange-05 py-[2px] px-[6px] rounded-2xl mr-3 text-base hover:scale-105 transition-all'
    const { getByRole } = render(<FilterButton onClick={() => {}} />)

    expect(getByRole('button')).toHaveClass(testClassName)
  })

  it('Should renders button with the incorrect styles', () => {
    const { getByRole } = render(<FilterButton onClick={() => {}} />)

    expect(getByRole('button')).not.toHaveClass('border-red-500')
  })
})

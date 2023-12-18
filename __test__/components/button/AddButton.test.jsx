import AddButton from '@/components/button/AddButton'
import { render } from '@testing-library/react'

describe('Add Button Component', () => {
  it('Should renders button with the correct styles', () => {
    const { getByRole } = render(<AddButton onClick={() => {}} />)

    expect(getByRole('button')).toHaveClass(
      'flex items-center border-[1px] bg-orange-05 border-orange-05 py-[3px] px-[7px] rounded-2xl mr-3 text-base hover:scale-105 transition-all'
    )
  })
  it('Should renders button with the incorrect styles', () => {
    const { getByRole } = render(<AddButton onClick={() => {}} />)

    expect(getByRole('button')).not.toHaveClass(
      'flex items-center border-[1px] bg-orange-05 border-orange-05 py-[3px] px-[7px] rounded-2xl mr-3 text-lg hover:scale-105 transition-all'
    )
  })
})

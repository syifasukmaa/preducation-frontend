import SearchButton from '@/components/button/SearchButton'
import { render } from '@testing-library/react'

describe('Search Button component', () => {
  it('Should renders button with the correct styles', () => {
    const testClassName = 'hover:scale-110 transition-all'
    const { getByRole } = render(<SearchButton onClick={() => {}} />)

    expect(getByRole('button')).toHaveClass(testClassName)
  })

  it('Should renders button with the incorrect styles', () => {
    const { getByRole } = render(<SearchButton onClick={() => {}} />)

    expect(getByRole('button')).not.toHaveClass('border-red-500')
  })
})

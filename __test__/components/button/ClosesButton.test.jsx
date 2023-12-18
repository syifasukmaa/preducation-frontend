import ClosesButton from '@/components/button/ClosesButton'
import { render } from '@testing-library/react'

describe('Closes Button component', () => {
  it('Should renders button with the correct styles', () => {
    const testClassName = 'bg-red-500 text-white'
    const { getByRole } = render(<ClosesButton onClick={() => {}} style={testClassName} />)

    expect(getByRole('button')).toHaveClass(testClassName)
  })

  it('Should renders button with the incorrect styles', () => {
    const testClassName = 'bg-red-500 text-white'
    const { getByRole } = render(<ClosesButton onClick={() => {}} style={testClassName} />)

    expect(getByRole('button')).not.toHaveClass('border-red-500')
  })
})

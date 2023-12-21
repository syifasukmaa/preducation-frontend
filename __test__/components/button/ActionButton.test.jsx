import ActionButton from '@/components/button/ActionButton'
import { render } from '@testing-library/react'

describe('Action Button Component', () => {
  it('Should renders buttom provided with styles and content', () => {
    const testContent = 'Test Button'
    const testStyle = 'bg-red-500'
    const { getByText } = render(
      <ActionButton styles={'bg-red-500'} onClick={() => {}}>
        {testContent}
      </ActionButton>
    )

    expect(getByText(testContent)).toHaveClass(testStyle)
  })
})

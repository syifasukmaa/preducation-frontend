import Home from '@/app/page'
import { render, screen } from '@testing-library/react'

it('It should contain text Hello world', () => {
  render(<Home />)
  expect(screen.getByRole('main')).toHaveTextContent('Hello world')
})

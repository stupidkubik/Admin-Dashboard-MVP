import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from '../Button'

describe('Button Component', () => {
  it('renders button with default styles', () => {
    render(<Button>Click me</Button>)
    const button = screen.getByRole('button', { name: 'Click me' })

    expect(button).toBeInTheDocument()
    expect(button).toHaveClass('bg-blue-600')
    expect(button).toHaveClass('text-white')
  })

  it('merges custom className with default styles', () => {
    render(<Button className="custom-class">Custom Button</Button>)
    const button = screen.getByRole('button')

    expect(button).toHaveClass('custom-class')
    expect(button).toHaveClass('bg-blue-600') // Should still have default styles
  })

  it('handles click events', async () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click me</Button>)

    const button = screen.getByRole('button')
    await userEvent.click(button)

    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('can be disabled', () => {
    render(<Button disabled>Disabled Button</Button>)
    const button = screen.getByRole('button')

    expect(button).toBeDisabled()
    expect(button).toHaveClass('disabled:opacity-50')
  })

  it('forwards additional HTML attributes', () => {
    render(
      <Button data-testid="test-button" aria-label="Test Button">
        Test Button
      </Button>
    )

    const button = screen.getByTestId('test-button')
    expect(button).toHaveAttribute('aria-label', 'Test Button')
  })
})

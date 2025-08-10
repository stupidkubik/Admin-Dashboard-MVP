import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Toggle } from '../Toggle'

describe('Toggle Component', () => {
  it('renders toggle with default styles', () => {
    render(<Toggle>Toggle Me</Toggle>)
    const toggle = screen.getByRole('button')

    expect(toggle).toBeInTheDocument()
    expect(toggle).toHaveClass('rounded', 'border', 'px-3', 'py-2', 'text-sm')
    expect(toggle).toHaveClass('bg-white', 'text-gray-700') // Initial state
  })

  it('merges custom className with default styles', () => {
    render(<Toggle className="custom-class">Toggle Me</Toggle>)
    const toggle = screen.getByRole('button')

    expect(toggle).toHaveClass('custom-class')
    expect(toggle).toHaveClass('rounded', 'border') // Should still have default styles
  })

  it('toggles state on click', async () => {
    render(<Toggle>Toggle Me</Toggle>)
    const toggle = screen.getByRole('button')

    // Initial state
    expect(toggle).toHaveClass('bg-white', 'text-gray-700')
    expect(toggle).not.toHaveClass('bg-blue-600', 'text-white')

    // After click
    await userEvent.click(toggle)
    expect(toggle).toHaveClass('bg-blue-600', 'text-white')
    expect(toggle).not.toHaveClass('bg-white', 'text-gray-700')

    // After second click
    await userEvent.click(toggle)
    expect(toggle).toHaveClass('bg-white', 'text-gray-700')
    expect(toggle).not.toHaveClass('bg-blue-600', 'text-white')
  })

  it('calls onClick handler when clicked', async () => {
    const handleClick = jest.fn()
    render(<Toggle onClick={handleClick}>Toggle Me</Toggle>)

    const toggle = screen.getByRole('button')
    await userEvent.click(toggle)

    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('can be disabled', () => {
    render(<Toggle disabled>Toggle Me</Toggle>)
    const toggle = screen.getByRole('button')

    expect(toggle).toBeDisabled()
  })

  it('forwards additional HTML attributes', () => {
    render(
      <Toggle
        data-testid="test-toggle"
        aria-label="Test Toggle"
        name="test"
        type="button"
      >
        Toggle Me
      </Toggle>
    )

    const toggle = screen.getByTestId('test-toggle')
    expect(toggle).toHaveAttribute('aria-label', 'Test Toggle')
    expect(toggle).toHaveAttribute('name', 'test')
    expect(toggle).toHaveAttribute('type', 'button')
  })

  it('maintains pressed state through re-renders', async () => {
    const { rerender } = render(<Toggle>Toggle Me</Toggle>)
    const toggle = screen.getByRole('button')

    await userEvent.click(toggle)
    expect(toggle).toHaveClass('bg-blue-600', 'text-white')

    rerender(<Toggle>Toggle Me</Toggle>)
    expect(toggle).toHaveClass('bg-blue-600', 'text-white')
  })
})

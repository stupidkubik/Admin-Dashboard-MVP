import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Checkbox } from '../Checkbox'

describe('Checkbox Component', () => {
  it('renders checkbox with default styles', () => {
    render(<Checkbox aria-label="test checkbox" />)
    const checkbox = screen.getByRole('checkbox')

    expect(checkbox).toBeInTheDocument()
    expect(checkbox).toHaveClass('h-4', 'w-4', 'rounded', 'border-gray-300', 'text-blue-600')
  })

  it('merges custom className with default styles', () => {
    render(<Checkbox className="custom-class" aria-label="test checkbox" />)
    const checkbox = screen.getByRole('checkbox')

    expect(checkbox).toHaveClass('custom-class')
    expect(checkbox).toHaveClass('h-4', 'w-4') // Should still have default styles
  })

  it('handles change events', async () => {
    const handleChange = jest.fn()
    render(<Checkbox onChange={handleChange} aria-label="test checkbox" />)

    const checkbox = screen.getByRole('checkbox')
    await userEvent.click(checkbox)

    expect(handleChange).toHaveBeenCalledTimes(1)
    expect(checkbox).toBeChecked()
  })

  it('can be disabled', () => {
    render(<Checkbox disabled aria-label="test checkbox" />)
    const checkbox = screen.getByRole('checkbox')

    expect(checkbox).toBeDisabled()
  })

  it('can be checked by default', () => {
    render(<Checkbox defaultChecked aria-label="test checkbox" />)
    const checkbox = screen.getByRole('checkbox')

    expect(checkbox).toBeChecked()
  })

  it('forwards additional HTML attributes', () => {
    render(
      <Checkbox
        data-testid="test-checkbox"
        aria-label="Test Checkbox"
        name="test"
        value="test-value"
      />
    )

    const checkbox = screen.getByTestId('test-checkbox')
    expect(checkbox).toHaveAttribute('aria-label', 'Test Checkbox')
    expect(checkbox).toHaveAttribute('name', 'test')
    expect(checkbox).toHaveAttribute('value', 'test-value')
  })
})

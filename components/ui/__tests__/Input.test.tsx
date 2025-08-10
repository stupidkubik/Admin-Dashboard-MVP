import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Input } from '../Input'

describe('Input Component', () => {
  it('renders input with default styles', () => {
    render(<Input placeholder="Enter text" />)
    const input = screen.getByPlaceholderText('Enter text')

    expect(input).toBeInTheDocument()
    expect(input).toHaveClass('border')
    expect(input).toHaveClass('rounded')
  })

  it('merges custom className with default styles', () => {
    render(<Input className="custom-class" placeholder="Custom Input" />)
    const input = screen.getByPlaceholderText('Custom Input')

    expect(input).toHaveClass('custom-class')
    expect(input).toHaveClass('border') // Should still have default styles
  })

  it('handles user input', async () => {
    const handleChange = jest.fn()
    render(<Input onChange={handleChange} placeholder="Type here" />)

    const input = screen.getByPlaceholderText('Type here')
    await userEvent.type(input, 'Hello')

    expect(handleChange).toHaveBeenCalledTimes(5) // One call per character
    expect(input).toHaveValue('Hello')
  })

  it('can be disabled', () => {
    render(<Input disabled placeholder="Disabled Input" />)
    const input = screen.getByPlaceholderText('Disabled Input')

    expect(input).toBeDisabled()
  })

  it('forwards additional HTML attributes', () => {
    render(
      <Input
        data-testid="test-input"
        aria-label="Test Input"
        maxLength={10}
        placeholder="Test Input"
      />
    )

    const input = screen.getByTestId('test-input')
    expect(input).toHaveAttribute('aria-label', 'Test Input')
    expect(input).toHaveAttribute('maxlength', '10')
  })

  it('supports different input types', () => {
    render(<Input type="password" placeholder="Password" />)
    const input = screen.getByPlaceholderText('Password')

    expect(input).toHaveAttribute('type', 'password')
  })
})

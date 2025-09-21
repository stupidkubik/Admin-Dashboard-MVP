import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Switch } from '../Switch'

describe('Switch Component', () => {
  it('renders switch with default styles', () => {
    render(<Switch aria-label="test switch" />)

    const switchInput = screen.getByRole('checkbox')
    expect(switchInput).toBeInTheDocument()
    expect(switchInput).toHaveClass('sr-only')
    expect(switchInput).toHaveClass('peer')

    const track = switchInput.nextElementSibling
    expect(track).toHaveClass('h-5', 'w-10', 'rounded-full', 'bg-gray-300')

    const thumb = track?.firstElementChild
    expect(thumb).toHaveClass('h-4', 'w-4', 'rounded-full', 'bg-white')
  })

  it('provides peer classes for checked styling', () => {
    render(<Switch aria-label="test switch" />)

    const track = screen.getByRole('checkbox').nextElementSibling
    const thumb = track?.firstElementChild

    expect(track).toHaveClass('peer-checked:bg-blue-600')
    expect(thumb).toHaveClass('peer-checked:translate-x-5')
  })

  it('merges custom className with default styles', () => {
    render(<Switch className="custom-class" aria-label="test switch" />)

    const track = screen.getByRole('checkbox').nextElementSibling
    expect(track).toHaveClass('custom-class')
    expect(track).toHaveClass('h-5', 'w-10') // Should still have default styles
  })

  it('handles change events', async () => {
    const handleChange = jest.fn()
    render(<Switch onChange={handleChange} aria-label="test switch" />)

    const switchInput = screen.getByRole('checkbox')
    await userEvent.click(switchInput)

    expect(handleChange).toHaveBeenCalledTimes(1)
  })

  it('can be disabled', () => {
    render(<Switch disabled aria-label="test switch" />)
    const switchInput = screen.getByRole('checkbox')

    expect(switchInput).toBeDisabled()
  })

  it('can be checked by default', () => {
    render(<Switch defaultChecked aria-label="test switch" />)
    const switchInput = screen.getByRole('checkbox')

    expect(switchInput).toBeChecked()
  })

  it('supports controlled usage', () => {
    render(<Switch checked onChange={() => { }} aria-label="test switch" />)
    const switchInput = screen.getByRole('checkbox')

    expect(switchInput).toBeChecked()
  })

  it('forwards additional HTML attributes', () => {
    render(
      <Switch
        data-testid="test-switch"
        aria-label="Test Switch"
        name="test"
        value="test-value"
      />
    )

    const switchInput = screen.getByTestId('test-switch')
    expect(switchInput).toHaveAttribute('aria-label', 'Test Switch')
    expect(switchInput).toHaveAttribute('name', 'test')
    expect(switchInput).toHaveAttribute('value', 'test-value')
  })
})

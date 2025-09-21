import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Switch } from '../Switch'

describe('Switch Component', () => {
  const getElements = () => {
    const input = screen.getByRole('checkbox')
    const label = input.parentElement as HTMLElement
    const track = input.nextElementSibling as HTMLElement | null
    const thumb = track?.nextElementSibling as HTMLElement | null
    return { input, label, track, thumb }
  }

  it('renders switch with default styles', () => {
    render(<Switch aria-label="test switch" />)

    const { input, label, track, thumb } = getElements()

    expect(input).toHaveClass('sr-only', 'peer')
    expect(label).toHaveClass('inline-flex', 'h-6', 'w-11')
    expect(label).toHaveClass('items-center')
    expect(track).toHaveClass('rounded-full', 'border-border/40', 'bg-muted')
    expect(thumb).toHaveClass('rounded-full', 'bg-white')
  })

  it('provides peer classes for checked styling', () => {
    render(<Switch aria-label="test switch" />)

    const { track, thumb } = getElements()

    expect(track).toHaveClass('peer-checked:bg-primary')
    expect(track).toHaveClass('peer-checked:border-primary/60')
    expect(thumb).toHaveClass('peer-checked:translate-x-5')
  })

  it('merges custom className with default styles on the wrapper', () => {
    render(<Switch className="custom-class" aria-label="test switch" />)

    const { label } = getElements()
    expect(label).toHaveClass('custom-class')
    expect(label).toHaveClass('inline-flex', 'h-6', 'w-11')
  })

  it('handles change events', async () => {
    const handleChange = jest.fn()
    render(<Switch onChange={handleChange} aria-label="test switch" />)

    const { input } = getElements()
    await userEvent.click(input)

    expect(handleChange).toHaveBeenCalledTimes(1)
  })

  it('can be disabled', () => {
    render(<Switch disabled aria-label="test switch" />)
    const { input } = getElements()

    expect(input).toBeDisabled()
    expect(input.parentElement).toHaveClass('cursor-not-allowed')
  })

  it('can be checked by default', () => {
    render(<Switch defaultChecked aria-label="test switch" />)
    const { input } = getElements()

    expect(input).toBeChecked()
  })

  it('supports controlled usage', () => {
    render(<Switch checked onChange={() => {}} aria-label="test switch" />)
    const { input } = getElements()

    expect(input).toBeChecked()
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

    const input = screen.getByTestId('test-switch')
    expect(input).toHaveAttribute('aria-label', 'Test Switch')
    expect(input).toHaveAttribute('name', 'test')
    expect(input).toHaveAttribute('value', 'test-value')
  })
})

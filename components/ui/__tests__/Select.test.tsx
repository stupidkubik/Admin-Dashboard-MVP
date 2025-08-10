import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Select } from '../Select'

describe('Select Component', () => {
  const defaultOptions = (
    <>
      <option value="1">Option 1</option>
      <option value="2">Option 2</option>
      <option value="3">Option 3</option>
    </>
  )

  it('renders select with default styles', () => {
    render(<Select>{defaultOptions}</Select>)
    const select = screen.getByRole('combobox')

    expect(select).toBeInTheDocument()
    expect(select).toHaveClass('border', 'rounded', 'px-3', 'py-2', 'w-full', 'bg-white')
  })

  it('merges custom className with default styles', () => {
    render(<Select className="custom-class">{defaultOptions}</Select>)
    const select = screen.getByRole('combobox')

    expect(select).toHaveClass('custom-class')
    expect(select).toHaveClass('border', 'rounded') // Should still have default styles
  })

  it('renders options correctly', () => {
    render(<Select>{defaultOptions}</Select>)

    const options = screen.getAllByRole('option')
    expect(options).toHaveLength(3)
    expect(options[0]).toHaveValue('1')
    expect(options[1]).toHaveValue('2')
    expect(options[2]).toHaveValue('3')
  })

  it('handles change events', async () => {
    const handleChange = jest.fn()
    render(<Select onChange={handleChange}>{defaultOptions}</Select>)

    const select = screen.getByRole('combobox')
    await userEvent.selectOptions(select, '2')

    expect(handleChange).toHaveBeenCalledTimes(1)
    expect(select).toHaveValue('2')
  })

  it('can be disabled', () => {
    render(<Select disabled>{defaultOptions}</Select>)
    const select = screen.getByRole('combobox')

    expect(select).toBeDisabled()
  })

  it('can have a default value', () => {
    render(<Select defaultValue="2">{defaultOptions}</Select>)
    const select = screen.getByRole('combobox')

    expect(select).toHaveValue('2')
  })

  it('forwards additional HTML attributes', () => {
    render(
      <Select
        data-testid="test-select"
        aria-label="Test Select"
        name="test"
        required
      >
        {defaultOptions}
      </Select>
    )

    const select = screen.getByTestId('test-select')
    expect(select).toHaveAttribute('aria-label', 'Test Select')
    expect(select).toHaveAttribute('name', 'test')
    expect(select).toHaveAttribute('required')
  })

  it('supports multiple selection', async () => {
    const handleChange = jest.fn()
    render(
      <Select multiple onChange={handleChange}>
        {defaultOptions}
      </Select>
    )

    const select = screen.getByRole('listbox')
    await userEvent.selectOptions(select, ['1', '3'])

    expect(handleChange).toHaveBeenCalledTimes(2)
    expect(select).toHaveValue(['1', '3'])
  })
})

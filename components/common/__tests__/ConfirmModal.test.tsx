import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ConfirmModal from '../ConfirmModal'

describe('ConfirmModal Component', () => {
  const defaultProps = {
    open: true,
    title: 'Confirm Action',
    onConfirm: jest.fn(),
    onCancel: jest.fn(),
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders nothing when closed', () => {
    render(<ConfirmModal {...defaultProps} open={false} />)

    expect(screen.queryByText('Confirm Action')).not.toBeInTheDocument()
  })

  it('renders modal with title when open', () => {
    render(<ConfirmModal {...defaultProps} />)

    expect(screen.getByText('Confirm Action')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Confirm' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument()
  })

  it('renders optional description when provided', () => {
    const description = 'Are you sure you want to perform this action?'
    render(<ConfirmModal {...defaultProps} description={description} />)

    expect(screen.getByText(description)).toBeInTheDocument()
  })

  it('calls onConfirm when confirm button is clicked', async () => {
    render(<ConfirmModal {...defaultProps} />)

    const confirmButton = screen.getByRole('button', { name: 'Confirm' })
    await userEvent.click(confirmButton)

    expect(defaultProps.onConfirm).toHaveBeenCalledTimes(1)
    expect(defaultProps.onCancel).not.toHaveBeenCalled()
  })

  it('calls onCancel when cancel button is clicked', async () => {
    render(<ConfirmModal {...defaultProps} />)

    const cancelButton = screen.getByRole('button', { name: 'Cancel' })
    await userEvent.click(cancelButton)

    expect(defaultProps.onCancel).toHaveBeenCalledTimes(1)
    expect(defaultProps.onConfirm).not.toHaveBeenCalled()
  })

  it('applies correct styling to buttons', () => {
    render(<ConfirmModal {...defaultProps} />)

    const confirmButton = screen.getByRole('button', { name: 'Confirm' })
    const cancelButton = screen.getByRole('button', { name: 'Cancel' })

    expect(confirmButton).toHaveClass('bg-red-600', 'text-white')
    expect(cancelButton).toHaveClass('border')
  })
})

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Dialog } from '../Dialog'

describe('Dialog Component', () => {
  const defaultProps = {
    open: true,
    onClose: jest.fn(),
    children: <div>Dialog content</div>
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders nothing when closed', () => {
    render(<Dialog {...defaultProps} open={false} />)

    expect(screen.queryByText('Dialog content')).not.toBeInTheDocument()
  })

  it('renders dialog when open', () => {
    render(<Dialog {...defaultProps} />)

    expect(screen.getByText('Dialog content')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument()
  })

  it('renders title when provided', () => {
    render(<Dialog {...defaultProps} title="Test Dialog" />)

    expect(screen.getByText('Test Dialog')).toBeInTheDocument()
    expect(screen.getByText('Test Dialog')).toHaveClass('text-lg', 'font-semibold')
  })

  it('calls onClose when close button is clicked', async () => {
    render(<Dialog {...defaultProps} />)

    const closeButton = screen.getByRole('button', { name: 'Close' })
    await userEvent.click(closeButton)

    expect(defaultProps.onClose).toHaveBeenCalledTimes(1)
  })

  it('applies correct styles to dialog container', () => {
    render(<Dialog {...defaultProps} />)

    const overlay = screen.getByText('Dialog content').parentElement?.parentElement
    expect(overlay).toHaveClass('fixed', 'inset-0', 'z-50', 'bg-black/50')
  })

  it('applies correct styles to dialog content', () => {
    render(<Dialog {...defaultProps} />)

    const dialogContent = screen.getByText('Dialog content').parentElement
    expect(dialogContent).toHaveClass('w-full', 'max-w-md', 'rounded', 'bg-white')
  })

  it('renders custom content correctly', () => {
    const customContent = (
      <div>
        <h3>Custom Title</h3>
        <p>Custom description</p>
        <button>Custom Action</button>
      </div>
    )

    render(<Dialog {...defaultProps}>{customContent}</Dialog>)

    expect(screen.getByText('Custom Title')).toBeInTheDocument()
    expect(screen.getByText('Custom description')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Custom Action' })).toBeInTheDocument()
  })

  it('has the correct structure and ordering', () => {
    render(<Dialog {...defaultProps} title="Test Dialog" />)

    const dialogElement = screen.getByText('Test Dialog').parentElement
    const elements = dialogElement?.children || []

    // Check structure order: title -> content -> actions
    expect(elements[0]).toHaveTextContent('Test Dialog') // Title
    expect(elements[1]).toHaveTextContent('Dialog content') // Content
    expect(elements[2]).toContainElement(screen.getByRole('button', { name: 'Close' })) // Actions
  })
})

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AvatarMenu from '../AvatarMenu'

describe('AvatarMenu Component', () => {
  beforeEach(() => {
    // Reset window.alert mock before each test
    jest.spyOn(window, 'alert').mockImplementation(() => { })
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('renders avatar button initially', () => {
    render(<AvatarMenu />)

    const button = screen.getByRole('button', { name: 'Toggle menu' })
    expect(button).toBeInTheDocument()
    expect(button).toHaveClass('h-8', 'w-8', 'rounded-full')
  })

  it('shows dropdown menu when avatar is clicked', async () => {
    render(<AvatarMenu />)

    // Menu should be hidden initially
    expect(screen.queryByText('Settings')).not.toBeInTheDocument()
    expect(screen.queryByText('Logout')).not.toBeInTheDocument()

    // Click avatar to open menu
    const button = screen.getByRole('button', { name: 'Toggle menu' })
    await userEvent.click(button)

    // Menu should be visible
    expect(screen.getByText('Settings')).toBeInTheDocument()
    expect(screen.getByText('Logout')).toBeInTheDocument()
  })

  it('hides dropdown menu when avatar is clicked again', async () => {
    render(<AvatarMenu />)

    // Open menu
    const button = screen.getByRole('button', { name: 'Toggle menu' })
    await userEvent.click(button)

    // Close menu
    await userEvent.click(button)

    // Menu should be hidden
    expect(screen.queryByText('Settings')).not.toBeInTheDocument()
    expect(screen.queryByText('Logout')).not.toBeInTheDocument()
  })

  it('navigates to settings page and closes menu when Settings is clicked', async () => {
    render(<AvatarMenu />)

    // Open menu
    await userEvent.click(screen.getByRole('button', { name: 'Toggle menu' }))

    // Click Settings link
    const settingsLink = screen.getByText('Settings')
    expect(settingsLink).toHaveAttribute('href', '/settings')

    await userEvent.click(settingsLink)

    // Menu should be closed
    expect(screen.queryByText('Settings')).not.toBeInTheDocument()
  })

  it('shows alert and closes menu when Logout is clicked', async () => {
    const alertSpy = jest.spyOn(window, 'alert')
    render(<AvatarMenu />)

    // Open menu
    await userEvent.click(screen.getByRole('button', { name: 'Toggle menu' }))

    // Click Logout button
    await userEvent.click(screen.getByText('Logout'))

    // Alert should be shown
    expect(alertSpy).toHaveBeenCalledWith('Logged out')

    // Menu should be closed
    expect(screen.queryByText('Logout')).not.toBeInTheDocument()
  })

  it('applies correct hover styles to menu items', async () => {
    render(<AvatarMenu />)

    // Open menu
    await userEvent.click(screen.getByRole('button', { name: 'Toggle menu' }))

    const settingsLink = screen.getByText('Settings')
    const logoutButton = screen.getByText('Logout')

    expect(settingsLink).toHaveClass('hover:bg-gray-100', 'dark:hover:bg-gray-700')
    expect(logoutButton).toHaveClass('hover:bg-gray-100', 'dark:hover:bg-gray-700')
  })
})

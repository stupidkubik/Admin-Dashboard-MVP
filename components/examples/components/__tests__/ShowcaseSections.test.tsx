import { render, screen } from '@testing-library/react'
import TypographyShowcase, { type TypographyItem } from '../TypographyShowcase'
import ButtonsShowcase from '../ButtonsShowcase'
import CardsShowcase from '../CardsShowcase'
import StatusIndicators, { type StatusIndicator } from '../StatusIndicators'
import AlertList from '../AlertList'
import FormShowcase, { type FormControl, type FormField } from '../FormShowcase'
import AnimationsGrid from '../AnimationsGrid'

describe('Showcase sections', () => {
  it('renders typography examples', () => {
    const headings: TypographyItem[] = [
      { element: 'h1', text: 'Heading' },
    ]

    const paragraphs: TypographyItem[] = [
      { text: 'Body text' },
    ]

    render(
      <TypographyShowcase headings={headings} paragraphs={paragraphs} truncations={[]} />
    )

    expect(screen.getByRole('heading', { name: 'Heading', level: 1 })).toBeInTheDocument()
    expect(screen.getByText('Body text')).toBeInTheDocument()
  })

  it('renders buttons showcase with provided variants', () => {
    render(
      <ButtonsShowcase
        variants={[{ label: 'Primary', className: 'btn btn-primary' }]}
        sizes={[]}
        groupButtons={[]}
      />
    )

    expect(screen.getByRole('button', { name: 'Primary' })).toHaveClass('btn-primary')
  })

  it('renders cards showcase', () => {
    render(
      <CardsShowcase
        cards={[
          {
            title: 'Card Title',
            description: 'Description',
            className: 'rounded-lg',
          },
        ]}
      />
    )

    expect(screen.getByText('Card Title')).toBeInTheDocument()
    expect(screen.getByText('Description')).toBeInTheDocument()
  })

  it('renders status indicators', () => {
    const indicators: StatusIndicator[] = [
      { label: 'Online', dotClass: 'status-dot status-online' },
    ]

    render(<StatusIndicators indicators={indicators} />)

    expect(screen.getByText('Online')).toBeInTheDocument()
  })

  it('renders alert list', () => {
    render(
      <AlertList
        alerts={[{ message: 'Success message goes here', className: 'alert-success' }]}
      />
    )

    const alertContainer = screen.getByText('Success message goes here').parentElement as HTMLElement;
    expect(alertContainer).toHaveClass('alert-success')
  })

  it('renders form showcase fields and controls', () => {
    const fields: FormField[] = [
      { id: 'email', label: 'Email', type: 'email', component: 'input' },
    ]

    const controls: FormControl[][] = [
      [{ id: 'terms', label: 'Accept terms', type: 'checkbox' }],
    ]

    render(<FormShowcase fields={fields} controls={controls} />)

    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(screen.getByLabelText('Accept terms')).toBeInTheDocument()
  })

  it('renders animations grid', () => {
    render(
      <AnimationsGrid animations={[{ label: 'Fade In', className: 'animate-fade-in' }]} />
    )

    const animationCard = screen.getByText('Fade In').parentElement as HTMLElement;
    expect(animationCard).toHaveClass('animate-fade-in')
  })
})

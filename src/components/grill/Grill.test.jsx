import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Grill from './Grill'

describe('Grill Component', () => {
  test('renders product rows with correct initial state', () => {
    const productRows = [
      { id: 1, products: [{ name: 'Product 1', image: 'image1.jpg', details: 'Details 1' }], alignment: 'left' },
      { id: 2, products: [{ name: 'Product 2', image: 'image2.jpg', details: 'Details 2' }], alignment: 'center' },
    ]

    const { getByText, getByAltText } = render(<Grill productRows={productRows} />)

    expect(getByText('Product 1')).toBeInTheDocument()
    expect(getByAltText('Product 1')).toBeInTheDocument()
    expect(getByText('Details 1')).toBeInTheDocument()

    expect(getByText('Product 2')).toBeInTheDocument()
    expect(getByAltText('Product 2')).toBeInTheDocument()
    expect(getByText('Details 2')).toBeInTheDocument()
  })

  test('zooms in and out correctly', () => {
    const productRows = [
      { id: 1, products: [{ name: 'Product 1', image: 'image1.jpg', details: 'Details 1' }], alignment: 'left' },
    ]

    const { getByText } = render(<Grill productRows={productRows} />)

    // Zoom in
    fireEvent.click(getByText('Zoom In'))
    expect(getByText('Product 1')).toHaveStyle('transform: scale(1.1)')

    // Zoom out
    fireEvent.click(getByText('Zoom Out'))
    expect(getByText('Product 1')).toHaveStyle('transform: scale(1)')
  })
})

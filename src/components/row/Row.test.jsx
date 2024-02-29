import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import ProductRow from './ProductRow'

describe('ProductRow Component', () => {
  test('renders product row correctly', () => {
    const products = [
      { name: 'Product 1', image: 'image1.jpg', details: 'Details 1' },
      { name: 'Product 2', image: 'image2.jpg', details: 'Details 2' },
    ]

    const { getByText, getByAltText } = render(<ProductRow index={1} rowId={1} products={products} alignment="left" />)

    expect(getByText('Product 1')).toBeInTheDocument()
    expect(getByText('Details 1')).toBeInTheDocument()
    expect(getByText('Product 2')).toBeInTheDocument()
    expect(getByText('Details 2')).toBeInTheDocument()

    expect(getByAltText('Product 1')).toBeInTheDocument()
    expect(getByAltText('Product 2')).toBeInTheDocument()
  })
})

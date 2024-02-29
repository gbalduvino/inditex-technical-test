import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Product from './Product'

describe('Product Component', () => {
  test('renders product details correctly', () => {
    const product = {
      rowId: 1,
      index: 0,
      name: 'Test Product',
      image: 'test-image-url.jpg',
      details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      moveProduct: jest.fn(),
    }

    const { getByAltText, getByText } = render(<Product {...product} />)

    const productImage = getByAltText('Test Product')
    expect(productImage).toBeInTheDocument()
    expect(productImage).toHaveAttribute('src', 'test-image-url.jpg')

    expect(getByText('Test Product')).toBeInTheDocument()
    expect(getByText('Lorem ipsum dolor sit amet, consectetur adipiscing elit.')).toBeInTheDocument()
  })
})

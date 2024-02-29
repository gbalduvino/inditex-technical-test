import React, { useState } from 'react'
import { useEffect } from 'react'
import { CreateRow } from '../createRow/CreateRow'
import { ProductRow } from '../row/Row'

export const Grill = () => {
  const [productRowsState, setProductRowsState] = useState([])
  const [zoomLevel, setZoomLevel] = useState(1)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // TODO: call to a real backend
        // const response = await fetch('/products?ids=[productId1, productId2]')

        const products = [
          { name: 'Product 1', price: '1,5 EUR', image: "https://www.mountaingoatsoftware.com/uploads/blog/2016-09-06-what-is-a-product-quote.png" },
          { name: 'Product 2', price: '5,24 EUR', image: "https://www.mountaingoatsoftware.com/uploads/blog/2016-09-06-what-is-a-product-quote.png" },
          { name: 'Product 3', price: '3,5 EUR', image: "https://www.mountaingoatsoftware.com/uploads/blog/2016-09-06-what-is-a-product-quote.png" },
          { name: 'Product 4', price: '7,1 EUR', image: 'https://www.mountaingoatsoftware.com/uploads/blog/2016-09-06-what-is-a-product-quote.png' },
          { name: 'Product 5', price: '9 EUR', image: 'https://www.mountaingoatsoftware.com/uploads/blog/2016-09-06-what-is-a-product-quote.png' },
          { name: 'Product 6', price: '4,70 EUR', image: 'https://www.mountaingoatsoftware.com/uploads/blog/2016-09-06-what-is-a-product-quote.png' },
          { name: 'Product 7', price: '10,1 EUR', image: 'https://www.mountaingoatsoftware.com/uploads/blog/2016-09-06-what-is-a-product-quote.png' },
          { name: 'Product 8', price: '11,43 EUR', image: 'https://www.mountaingoatsoftware.com/uploads/blog/2016-09-06-what-is-a-product-quote.png' }
        ]

        const splitProducts = [];

        for (let i = 0; i < products.length; i += 3) {
          const chunk = products.slice(i, i + 3);
          splitProducts.push(chunk);
        }

        setProductRowsState(splitProducts.map((splitprod) => {
          return {
            id: Math.random(),
            products: splitprod,
            alignment: 'center'
          }
        }))
      } catch (error) {
        console.error('Error fetching products:', error.message)
      }
    }

    fetchProducts()
  }, [])

  const handleZoomIn = () => {
    setZoomLevel((prevZoom) => Math.min(prevZoom + 0.1, 1))
  }

  const handleZoomOut = () => {
    setZoomLevel((prevZoom) => Math.max(prevZoom - 0.1, 0.5))
  }

  const moveRow = (dragIndex, hoverIndex) => {
    const draggedProduct = productRowsState[dragIndex];

    const reorderedRows = [...productRowsState];
    reorderedRows.splice(dragIndex, 1);
    reorderedRows.splice(hoverIndex, 0, draggedProduct);
    setProductRowsState([...reorderedRows])
  }

  const moveProduct = (dragIndex, hoverIndex, rowIdOrigin, rowIdDestiny) => {
    const originRow = productRowsState.find((productRow) => productRow.id === rowIdOrigin)
    const destinyRow = productRowsState.find((productRow) => productRow.id === rowIdDestiny)
    const draggedProduct = originRow.products[dragIndex]

    if (destinyRow.products.length < 3 || originRow.id === destinyRow.id) {
      originRow.products.splice(dragIndex, 1)
      destinyRow.products.splice(hoverIndex, 0, draggedProduct)
      setProductRowsState([...productRowsState])
    } else {
      alert('A row only can have three product as maximum')
    }
  }

  const createRow = (dragIndex, rowIdOrigin) => {
    const originRow = productRowsState.find((productRow) => productRow.id === rowIdOrigin)
    const draggedProduct = originRow.products[dragIndex]

    originRow.products.splice(dragIndex, 1)
    productRowsState.push({
      id: Math.random(),
      products: [draggedProduct],
      alignment: 'center'
    })
    setProductRowsState([...productRowsState])
  }

  const updateAlignment = (rowId, alignment) => {
    const rowToUpdate = productRowsState.find((productRow) => {
      return productRow.id === rowId
    })

    rowToUpdate.alignment = alignment
    setProductRowsState([...productRowsState])
  }

  const createGrid = async () => {
    // TODO: call to a real backend
    // const response = await fetch('/grids', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(productRows),
    // })

    alert('Succesfully created grid')
  }

  return (
    <div style={{ position: 'relative' }} className="d-flex justify-content-center">
      <div style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 999 }}>
        <button className="btn btn-outline-dark mx-1" onClick={handleZoomIn}>
          <i className="bi bi-zoom-in"></i>
        </button>
        <button className="btn btn-outline-dark" onClick={handleZoomOut}>
          <i className="bi bi-zoom-out"></i>
        </button>
      </div>

      <div style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'top left' }}>
        {productRowsState.map((productRow, index) => (
          <ProductRow key={`productId-${productRow.id}`} index={index} rowId={productRow.id} products={productRow.products} alignment={productRow.alignment} moveProduct={moveProduct} moveRow={moveRow} updateAlignment={updateAlignment}></ProductRow>
        ))}
        <CreateRow createRow={createRow}></CreateRow>

        <button className="btn btn-primary mb-3" onClick={() => createGrid()}>Create Grid</button>
      </div>

    </div>
  )
}

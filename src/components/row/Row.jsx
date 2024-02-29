import React, { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { Product } from '../product/Product'

export const ProductRow = ({ index, rowId, products, alignment, moveProduct, moveRow, updateAlignment }) => {
  const ref = useRef(null)

  const [, drop] = useDrop({
    accept: 'ROW',
    hover(item, monitor) {
      const dragIndex = item.index;
      const hoverIndex = index;
      
      if (!ref.current) return
      if (dragIndex === hoverIndex) return

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return

      moveRow(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  })

  const [{ isDragging }, drag] = useDrag({
    type: 'ROW',
    item: { index },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  })

  const opacity = isDragging ? 0.5 : 1

  drag(drop(ref))

  return (
    <div style={{ opacity }}>
      <div className="d-flex align-items-center">
        <div
          ref={ref}
          style={{ width: '40rem', gap: '5%' }}
          className={`d-flex flex-row ${alignment === 'left' ? 'justify-content-start' : alignment === 'right' ? 'justify-content-end' : alignment === 'center' ? 'justify-content-center' : '' } border my-3 mx-3 rounded p-2 shadow`}
        >              
          {products.map((product, index) => (
            <Product key={product.name} rowId={rowId} index={index} {...product} moveProduct={moveProduct} />
          ))}
        </div>

        <div className="ml-auto">
          <div className="btn-group" role="group" aria-label="Alignment">
            <input type="radio" className="btn-check" id={`alignment-left-${rowId}`} name={`alignment-${rowId}`} value="left" checked={alignment === 'left'} onChange={() => updateAlignment(rowId, 'left')} />
            <label className="btn btn-outline-secondary" htmlFor={`alignment-left-${rowId}`}><i className="bi bi-text-left"></i>Left</label>

            <input type="radio" className="btn-check" id={`alignment-center-${rowId}`} name={`alignment-${rowId}`} value="center" checked={alignment === 'center'} onChange={() => updateAlignment(rowId, 'center')} />
            <label className="btn btn-outline-secondary" htmlFor={`alignment-center-${rowId}`}><i className="bi bi-text-center"></i>Center</label>

            <input type="radio" className="btn-check" id={`alignment-right-${rowId}`} name={`alignment-${rowId}`} value="right" checked={alignment === 'right'} onChange={() => updateAlignment(rowId, 'right')} />
            <label className="btn btn-outline-secondary" htmlFor={`alignment-right-${rowId}`}><i className="bi bi-text-right"></i>Right</label>
          </div>
        </div>
      </div>
    </div>
  )
}

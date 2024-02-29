import React, { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'

export const Product = ({ rowId, index, name, image, details, moveProduct }) => {
  const ref = useRef(null)

  const [, drop] = useDrop({
    accept: 'PRODUCT',
    hover(item, monitor) {
      const dragIndex = item.index
      const hoverIndex = index
      
      if (!ref.current) return
      if (dragIndex === hoverIndex) return

      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      const hoverMiddleY = (hoverBoundingRect.right - hoverBoundingRect.left) / 2
      const clientOffset = monitor.getClientOffset()
      const hoverClientY = clientOffset.x - hoverBoundingRect.left

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return

      moveProduct(dragIndex, hoverIndex, item.rowId, rowId)
      item.index = hoverIndex
    },
  })

  const [{ isDragging }, drag] = useDrag({
    type: 'PRODUCT',
    item: { rowId, index },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  })

  const opacity = isDragging ? 0.5 : 1

  drag(drop(ref))

  return (
    <div ref={ref} style={{ opacity, width: '30%' }} className="card align-items-center">
      <img src={image} width="80" height="80" alt={name} className="rounded mt-2" />
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text">{details}</p>
      </div>
    </div>
  )
}

import React, { useRef } from 'react'
import { useDrop } from 'react-dnd'

export const CreateRow = ({ createRow }) => {
  const ref = useRef(null)

  const [, drop] = useDrop({
    accept: 'PRODUCT',
    hover(item,) {
      createRow(item.index, item.rowId);
    },
  })

  drop(ref)

  return (
    <div ref={ref} className="d-flex flex-column border p-3 mb-2 mx-4">
      <span><i className="bi bi-plus-circle"></i></span>
      <span>Drop a product here to create a new row</span>
    </div>
  )
}

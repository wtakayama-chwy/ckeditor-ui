import React from 'react'

const ProductPreview = ({
  image,
  onClick,
  id,
  name,
  price,
}: any) => {
  const style: any = {
    '--product-image': `url(${ image })`,
  }

  return (
    <div
      className="product-preview"
      style={style}
    >
      <button
        className="product-preview__add"
        title="Add to the offer"
        type="button"
        onClick={() => onClick(id)}
      >
        <span>+</span>
      </button>
      <span className="product-preview__name">{name}</span>
      <span className="product-preview__price">from {price}</span>
    </div>
  )
}

export default ProductPreview

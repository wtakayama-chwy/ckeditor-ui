import React from 'react'
import ProductPreview from './ProductPreview'

const ProductList = ({
  products,
  onClick,
}: any) => (
  <div className="app__product-list">
    <h3>Products</h3>
    <ul>
      {products.map((product: any) => (
        <li key={product.id}>
          <ProductPreview
            id={product.id}
            onClick={onClick}
            {...product}
          />
        </li>
      ))}
    </ul>
    <p><b>Tip</b>: Clicking the product will add it to the editor.</p>
  </div>
)

export default ProductList

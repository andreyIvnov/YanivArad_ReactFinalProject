import { v4 as uuidv4 } from 'uuid';
import { memo } from "react"
import { useDispatch, useSelector } from "react-redux"
import Product from "./Product"

function Products() {
  const products = useSelector((state) => state.products)
  console.log(products)
  const dispatch = useDispatch()

  return (
    <>
      {products && products.length > 0 &&
        <div style={{ backgroundColor: 'lightgray', padding: '8px 20px 10px 20px' }}>
          {console.log("Products render")}
          <span>
            {products.map((product, index) => {
              return (
                <Product key={index} passedProduct={product} />
              )
            })}
          </span>

          <span>
            <button onClick={() => dispatch({ type: 'ADD_PRODUCT', payload: {id: uuidv4()} })}>Add New</button>
          </span>
        </div>
      }
    </>
  )
}

export default memo(Products)
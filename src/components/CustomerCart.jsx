import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

function CustomerCart({ cart }) {
  const products = useSelector((state) => state.products)
  const [productsIntoCart, setProductsIntoCart] = useState([])

  useEffect(() => {
    if (cart && cart.products) {
      let prods = [];
      cart.products.map(prodId => {
        const existedProdIntoRedox = products.find(prod => prod.id === prodId);
        if (existedProdIntoRedox){
          const indexofExistedProduct = prods.findIndex(prodFromShowedList => existedProdIntoRedox.id === prodFromShowedList.id)
          if (indexofExistedProduct !== -1) {
            prods[indexofExistedProduct] = {...prods[indexofExistedProduct], count: prods[indexofExistedProduct].count + 1};
          }
          else{
            prods.push({...existedProdIntoRedox, count: 1})
          }
        }
      })
      setProductsIntoCart(prods)
    }
  }, [])


  return (
    <>
      {cart && productsIntoCart && productsIntoCart.length > 0  &&
        <table border={2} >
          <thead>
            <tr>
              <th>Product</th>
              <th>Qty</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {productsIntoCart.map(product => {
              return (
                <tr key={product.id}>
                  <td>{product.title}</td>
                  <td>{product.count}</td>
                  <td>{product.createdOn?.toDate().toLocaleDateString()}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      }
    </>
  )
}

export default CustomerCart
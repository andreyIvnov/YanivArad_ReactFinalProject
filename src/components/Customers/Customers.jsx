import { memo } from "react";
import { useSelector } from "react-redux";
import Customer from "../Customers/Customer"

function Customers() {
  const customers = useSelector((state) => state.customers);
  const carts = useSelector((state) => state.carts)


  return (
    <>
      {customers && customers.length > 0 &&
        <>
        <div style={{backgroundColor: 'lightgray', padding: '8px 0 0 20px'}}>
          <h3>Customers</h3>
          {customers.map(cust => {
            const customerCart = carts.filter((cart) => cart.userId === cust.id)
            return(
              <Customer key={cust.id} customer={{...cust, cart: customerCart && customerCart.length > 0 ? customerCart[0] : {}}}/>
            )
          })}

        </div>
        </>
      }
    </>
  )
}

export default Customers
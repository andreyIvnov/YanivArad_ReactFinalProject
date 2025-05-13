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
          <div style={{ backgroundColor: 'lightgray', padding: '8px 0 0 20px' }}>
            <h3>Customers</h3>
            <div>
              <table border={2} >
                <thead>
                  <tr>
                    <th>Full Name</th>
                    <th>Joined At</th>
                    <th>Products Bought</th>
                  </tr>
                </thead>
                <tbody>
                    {customers.map(cust => {
                      const customerCart = carts.find((cart) => cart.userId === cust.id)
                      return (
                        <tr key={cust.id} >
                          <Customer customer={{ ...cust, cart: customerCart  ? customerCart : {} }} />
                        </tr>
                      )
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </>
      }
    </>
  )
}

export default Customers
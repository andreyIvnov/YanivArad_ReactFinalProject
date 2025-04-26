import { memo } from "react";
import { useSelector } from "react-redux";
import Customer from "../Customers/Customer"

function Customers() {
  const customers = useSelector((state) => state.customers);

  return (
    <>
      {customers && customers.length > 0 &&
        <>
        <div style={{backgroundColor: 'lightgray', padding: '8px 0 0 20px'}}>
          <h3>Customers</h3>
          {customers.map(cust => {
            return(
              <Customer key={cust.id} customer={cust}/>
            )
          })}

        </div>
        </>
      }
    </>
  )
}

export default Customers
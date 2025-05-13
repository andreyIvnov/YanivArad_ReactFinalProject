import CustomerCart from "../CustomerCart";


function Customer({ customer }) {

    return (
        <>
            {customer &&
                <>
                    <td style={{ padding: '0 10px 0 10px' }}>{customer.firstName + " " + customer.lastName}</td>
                    <td style={{ padding: '0 10px 0 10px' }}>{customer.createdOn.toDate().toLocaleDateString()}</td>
                    <td style={{ padding: '10px 10px 10px 10px', textAlign: 'left' }}><CustomerCart cart={customer.cart} /></td>
                </>
            }
        </>
    )
}

export default Customer
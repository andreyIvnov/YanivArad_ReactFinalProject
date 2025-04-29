import CustomerCart from "../CustomerCart";


function Customer({ customer }) {

    return (
        <>
            {customer &&
                <>
                <div style={{textAlign: 'left'}}>
                    {customer.firstName + " " + customer.lastName} <span/>
                    {customer.createdOn.toDate().toLocaleString()}
                    <CustomerCart cart={customer.cart}/>
                </div>
                </>
            }
        </>
    )
}

export default Customer
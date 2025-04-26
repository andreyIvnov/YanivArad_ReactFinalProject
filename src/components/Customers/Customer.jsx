
function Customer({ customer }) {
    return (
        <>
            {customer &&
                <div>{customer.firstName + " " + customer.lastName}</div>
            }
        </>
    )
}

export default Customer
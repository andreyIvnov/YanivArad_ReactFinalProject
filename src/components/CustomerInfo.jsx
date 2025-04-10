import { useSelector } from "react-redux"

function CustomerInfo() {
    const user = useSelector((state) => state.user)
    return (
        <>
            <div>CustomerInfo: {user.userName}</div>
        </>
    )
}

export default CustomerInfo
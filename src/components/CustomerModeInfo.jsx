import { useSelector } from "react-redux"

function CustomerModeInfo() {
    const user = useSelector((state) => state.user)
    const navigate = useNavigate();
    
    if (!user || !user.id) {
        navigate("/");
    }

    return (
        <>
            <div>CustomerModeInfo: {user.userName}</div>
        </>
    )
}

export default CustomerModeInfo
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux"
import { useNavigate, Outlet, Link } from "react-router-dom"
import { getAllDocsByCollectionName } from "../utils/fdbManager";

const AdminModeInfo = () => {
    const [user, setUser] = useState({})
    const logInedUser = useSelector((state) => state.user);

    const navigate = useNavigate();
    const dispatch = useDispatch()

    useEffect(() => {
        if (logInedUser && logInedUser.id) {

            const setAdminModeData = async () => {
                const categories = await getAllDocsByCollectionName('categories');
                if (categories && categories.length > 0) {
                    dispatch({ type: 'SET_CATEGORIES', payload: categories })
                }
            }

            setAdminModeData()
                .then(() => {
                    setUser(logInedUser)
                })


        } else {
            navigate("/");
        }
    }, [])

    useEffect(() => {
        if(user && user.id) navigate("categories");
    }, [user])
    

    return (
        <>
            {!user && !user.id &&
                <>
                    <h3>Loading user data....</h3>
                </>
            }
            {user && user.id &&
                <>
                    {console.log("Admin mode render")}
                    <h3>Hello, {user.firstName}</h3>
                    <div style={{ display: 'flex', gap: '15px' }}>
                        <Link to='categories'><button>Categories</button></Link>
                        <Link to='products'><button>Products</button></Link>
                        <Link to='customers'><button>Customers</button></Link>
                        <Link to='statistics'><button>Statistics</button></Link>
                    </div>
                    <Outlet />
                </>
            }
        </>
    )
}

export default AdminModeInfo
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { getUserByUserNameAndPassword } from '../utils/fdbManager'

function Login() {
    const [logInUser, setLogInUser] = useState({})
    const [userInDB, setUserInDB] = useState({})
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (userInDB && userInDB.id) {
            dispatch({ type: 'SET_USER', payload: userInDB })

            if (userInDB.isAdmin) {
                navigate('/adminmodeinfo')
            }
            else
                navigate('/customermodeinfo')
        }
    }, [userInDB])

    const getUser = () => {
        if (logInUser && logInUser.userName && logInUser.password) {
            const getUser = async () => {
                const userFromDB = await getUserByUserNameAndPassword(logInUser.userName, logInUser.password)
                if (userFromDB && userFromDB.createdOn) {
                    setUserInDB(userFromDB);
                }
            }
            getUser();
        }
    }

    return (
        <>
            <div>
                <h3>E-Commercy: All To You Express Shop</h3>
                administrator007 <br />
                <input type="text" name="useName" onChange={e => setLogInUser({ ...logInUser, userName: e.target.value })} /><br />
                <input type="password" name="password" onChange={e => setLogInUser({ ...logInUser, password: e.target.value })} /><br />
                <button onClick={getUser}>Login</button><br />
                <div>New user? <Link to='/addnewuser'>Register</Link></div>
            </div>
        </>
    )
}

export default Login
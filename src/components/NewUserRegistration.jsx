import { useState, useEffect } from "react"
import { addNewDoc } from '../utils/fdbManager'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from "react-redux";



function NewUserRegistration() {
    const [newUser, setNewUser] = useState({})
    const [userInDB, setUserInDB] = useState({})
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (userInDB && userInDB.id) {
            dispatch({type: 'SET_USER', payload: userInDB})
            if(userInDB.isAdmin)
                navigate('/adminmodeinfo')
            else
                navigate('/customermodeinfo')
        }
    }, [userInDB])
    

    const handleNewUserChange = (e) => {
        const { type, name, checked, value } = e.target;
        setNewUser({ ...newUser, [name]: (type === 'checkbox' ? checked : value) })
    }
    
    const registerNewUser = () => {
        if (newUser) {
            const createUser = async() => {
                const justCreatedUser = await addNewDoc('users', { ...newUser, isAdmin: false, createdOn: new Date() });
                if(justCreatedUser && justCreatedUser.id){
                    setUserInDB(justCreatedUser);
                }
            }
            createUser()
        }
    }


    return (
        <>
            <h2>New User Registration</h2><br />
            First Name: <input type="text" name="firstName" onChange={handleNewUserChange} /><br />
            Last Name: <input type="text" name="lastName" onChange={handleNewUserChange} /><br />
            User Name: <input type="text" name="userName" onChange={handleNewUserChange} /><br />
            Password: <input type="password" name="password" onChange={handleNewUserChange} /><br />
            <input type="checkbox" name="isOthersCanSeeMyOrders" onChange={handleNewUserChange} /> Allow otheras to see my orders <br />
            <button onClick={registerNewUser}>Create</button>
        </>
    )
}

export default NewUserRegistration
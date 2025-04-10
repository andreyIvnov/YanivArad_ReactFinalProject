import { addDoc, collection, deleteDoc, doc, onSnapshot, query, where, getDocs } from 'firebase/firestore'
import db from '../utils/firebase.js'

const getUserByUserNameAndPassword = async (userName, password) => {
    const coll = collection(db, 'users');
    const q = query(coll, where('userName', '==', userName), where('password', '==', password))

    const querySnapshot = await getDocs(q);
    let userToReturn = {};
    querySnapshot.forEach((doc) => {
        const userData = doc.data();
        userToReturn = {
            id: doc.id,
            isAdmin: userData.isAdmin,
            userName: userData.userName,
            firstName: userData.firstName,
            lastName: userData.lastName,
            createdOn: Date(userData.createdOn),
        };
    })
    return userToReturn;
}

const addNewUser = async (newUserToAdd) => {
    const newUser = { ...newUserToAdd, isAdmin: false, createdOn: new Date() };
    const data = await addDoc(collection(db, 'users'), newUser);
    if (data && data.id) {
        return {...newUser, id: data.id}
    } else {
        return {};
    }
}


export { getUserByUserNameAndPassword, addNewUser }
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

const addNewDoc = async (collectionName, newDocToAdd) => {
    const newDoc = { ...newDocToAdd, isAdmin: false, createdOn: new Date() };
    const data = await addDoc(collection(db, collectionName), newDoc);
    if (data && data.id) {
        return { ...newDoc, id: data.id }
    } else {
        return {};
    }
}

const getAllDocsByCollectionName = async (collectionName) => {
    let docsToReturn = [];

    if (collectionName) {
        const coll = collection(db, collectionName);
        const q = query(coll)
    
        const querySnapshot = await getDocs(q);
        querySnapshot.docs.forEach((doc) => {
            const data = doc.data();
            docsToReturn.push({
                id: doc.id,
                ...data,
            });
        })
    }
    return docsToReturn;
}


export { getUserByUserNameAndPassword, addNewDoc, getAllDocsByCollectionName }
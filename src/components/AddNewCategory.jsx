import { useState } from "react"
import { useDispatch } from "react-redux";
import { addNewDoc } from "../utils/fdbManager";


function AddNewCateroria() {
    const dispatch = useDispatch()
    const [newCategory, setNewCategory] = useState({})
    

    const addNewCategory = () => {
        if (newCategory && newCategory.name) {
            const createCategory = async () => {
                const justCreatedCategory = await addNewDoc('categories', newCategory);
                if (justCreatedCategory && justCreatedCategory.id) {
                    dispatch({ type: 'ADD_CATEGORY', payload: justCreatedCategory })
                }
            }
            createCategory()
        }
    }

    return (
        <>
            <div>
                <input type="text" placeholder="Add new category" onChange={e => setNewCategory({ ...newCategory, name: e.target.value })} /> <span />
                <button onClick={addNewCategory}>Add</button>
            </div>
        </>
    )
}

export default AddNewCateroria
import { useState } from "react";
import { useDispatch } from "react-redux"
import { deleteDocByDocId, updateDocByDocId } from "../../utils/fdbManager";

const fbCollectionName = 'categories';

function Categoria({ category }) {
    const dispatch = useDispatch();
    const [confirmUpdating, setConfirmUpdating] = useState(false)
    const [categoryDataToUpdate, setCategoryDataToUpdate] = useState({})

    const updateCurrentCategory = () => {
        if(confirmUpdating){
            setConfirmUpdating(!confirmUpdating)
            updateDocByDocId(fbCollectionName, category.id, categoryDataToUpdate)
            .then(() => {
                dispatch({ type: 'UPDATE_CATEGORY', payload: categoryDataToUpdate })
            })
        }
        else{
            setConfirmUpdating(!confirmUpdating)
        }
    }

    const removeCurrentCategory = () => {
        const deleteCategory = () => {
            deleteDocByDocId(fbCollectionName, category.id)
                .then(() => {
                    dispatch({ type: 'DELITE_CATEGORY', payload: category.id })
                })
        }
        deleteCategory();
    }

    return (
        <>
            <div style={{ display: 'flex', gap: '8px', padding: '0 0 10px 0' }}>
                {confirmUpdating &&
                    <>
                        Name: <input type="text" defaultValue={category.name} onChange={e => setCategoryDataToUpdate({ ...category, name: e.target.value })} /> <br />
                    </>
                }
                {!confirmUpdating &&
                    <>
                        {category.name}
                    </>
                }
                <button onClick={updateCurrentCategory}>Update</button>
                <button onClick={removeCurrentCategory}>Remove</button>
            </div>
        </>
    )
}

export default Categoria
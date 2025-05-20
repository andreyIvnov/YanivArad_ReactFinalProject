import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addNewDoc, updateDocByDocId } from "../../utils/fdbManager";
const fbCollectionName = 'products';

function Product({ passedProduct }) {
    const dispatch = useDispatch()
    const categories = useSelector((state) => state.categories);
    const carts = useSelector((state) => state.carts);
    const customers = useSelector((state) => state.customers);

    const [productToUpdate, setProductToUpdate] = useState({});
    const [productIntoCarts, setProductIntoCarts] = useState([])

    useEffect(() => {
        if (carts && carts.length > 0 && customers && customers.length > 0) {
            carts.map(cart => {
                const currentProduct = cart.products?.filter(prod => prod === passedProduct.id)
                if (currentProduct && currentProduct.length > 0) {
                    const customer = customers.find(cust => cust.id === cart.userId)
                    const indexOfProd = productIntoCarts.findIndex(pr => pr.id === customer.id)
                    if (indexOfProd === -1) {
                        setProductIntoCarts([...productIntoCarts, { id: customer.id, name: customer.firstName, quantity: currentProduct.length, addedToCartOn: cart.createdOn }])
                    }
                }
            })
        }
    }, [])

    const saveProduct = () => {
        if (passedProduct.id.length > 20) {
                const createProduct = async () =>{
                    const justCreatedProduct = await addNewDoc(fbCollectionName, productToUpdate);
                    if(justCreatedProduct && justCreatedProduct.id){
                        dispatch({ type: 'UPDATE_PRODUCT', payload: { ...productToUpdate, id: passedProduct.id, newId: justCreatedProduct.id } })
                    }
                }
                createProduct();
        }
        else {
            updateDocByDocId(fbCollectionName, passedProduct.id, productToUpdate)
                .then(() => {
                    dispatch({ type: 'UPDATE_PRODUCT', payload: { ...productToUpdate, id: passedProduct.id } })
                })
        }
    }


    return (
        <>
            <div style={{
                backgroundColor: passedProduct.id.length > 20 ? 'LightCyan' : 'white' ,
                padding: '5px 10px 10px 10px',
                border: '2px solid black',
                marginBottom: '10px',
                borderRadius: '10px',
                display: 'flex',
                textAlign: 'left',
                flexDirection: 'row', // <-- Horizontal layout
                justifyContent: 'space-between', // <-- Push left and right apart
                gap: '20px', // optional space between columns
            }}>

                <div style={{ flex: 1 }}>

                    <span>
                        <strong>
                            Title:
                        </strong>
                        <input type="text" name="title" defaultValue={passedProduct.title} onChange={e => setProductToUpdate({ ...productToUpdate, title: e.target.value })} />
                    </span> <br /> <br />

                    <span>
                        <strong>Category:</strong> <select name='category' onChange={e => setProductToUpdate({ ...productToUpdate, categoryId: e.target.value })}>
                            <option value="No"></option>
                            {categories && categories.map(cat => {
                                if (cat.id === passedProduct.categoryId)
                                    return (<option key={cat.id} value={cat.id} selected>{cat.name}</option>)
                                else
                                    return (<option key={cat.id} value={cat.id}>{cat.name}</option>)
                            })}
                        </select >
                    </span><br /><br />

                    <span>
                        <strong>Description: <br /></strong>
                        <textarea onChange={e => setProductToUpdate({ ...productToUpdate, description: e.target.value })} defaultValue={passedProduct.description} name="descContent" rows={5} cols={30} />
                    </span><br />
                    <button onClick={saveProduct}>Save</button>
                </div>

                <div style={{ flexBasis: '200px' }}>
                    <span>
                        <strong>Price:</strong>
                        <input type="number" name="price" defaultValue={passedProduct.price} onChange={e => setProductToUpdate({ ...productToUpdate, price: e.target.value })} />
                    </span> <br />

                    <span>
                        <strong>
                            Link to pic:
                        </strong>
                        <input type="text" name="linkToPic" defaultValue={passedProduct.linkToPic} onChange={e => setProductToUpdate({ ...productToUpdate, linkToPic: e.target.value })} />
                    </span> <br />

                    <span >
                        <strong>Bought By:</strong>
                        <table border={1} style={{ textAlign: 'center' }}>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Qty</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody >
                                {productIntoCarts && productIntoCarts.length > 0 && productIntoCarts.map((pInCart, index) => {
                                    return (
                                        <tr key={index} >
                                            <td>{pInCart.name}</td>
                                            <td>{pInCart.quantity}</td>
                                            <td>{pInCart.addedToCartOn?.toDate().toLocaleDateString()}</td>
                                        </tr>)
                                })}
                            </tbody>
                        </table>
                    </span>
                </div>
            </div>
        </>
    )
}

export default Product
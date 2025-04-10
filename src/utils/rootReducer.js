const initialState = {
    products: []
}

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD':
            return { ...state, products: state.products = [...state.products, action.payload] };

        case 'UPDATE':{
            const products = [...state.products]
            const index = products.findIndex((product) => { return product.id == action.payload.id });
            if (index !== -1) {
                products[index] = action.payload
            }

            return { ...state, products };}

        case 'DELITE':{
            const products = state.products.filter((product) => product.id !== action.payload)

            return { ...state, products: state.products = [...products] };}


        default:
            return state;
    }
}

export default productReducer
const initialState = {
    user: {},
    products: [],
    categories: []
}

const firebaseDocsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USER': {
            return { state, user: state.user = action.payload }
        }

        case "SET_CATEGORIES":{
            return {state, categories: state.categories = action.payload}
        }

        case "ADD_CATEGORY":{
            return { ...state, categories: state.categories = [...state.categories, action.payload] };
        }

        case "DELITE_CATEGORY":{
            const categories = state.categories.filter((category) => category.id !== action.payload)

            return { ...state, categories: state.categories = [...categories] };
        }

        case "UPDATE_CATEGORY":{
            const categories = [...state.categories]
            const index = categories.findIndex((category) => { return category.id == action.payload.id });
            if (index !== -1) {
                categories[index] = action.payload
            }
            return { ...state, categories };
        }

        // case 'ADD_PRODUCT':
        //     return { ...state, products: state.products = [...state.products, action.payload] };

        // case 'UPDATE_PRODUCT':{
        //     const products = [...state.products]
        //     const index = products.findIndex((product) => { return product.id == action.payload.id });
        //     if (index !== -1) {
        //         products[index] = action.payload
        //     }

        //     return { ...state, products };}

        // case 'DELITE_PRODUCT':{
        //     const products = state.products.filter((product) => product.id !== action.payload)

        //     return { ...state, products: state.products = [...products] };}


        default:
            return state;
    }
}


export default firebaseDocsReducer
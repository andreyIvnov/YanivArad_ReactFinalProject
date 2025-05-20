const initialState = {
    user: {},

    products: [],
    categories: [],
    customers: [],
    carts: [],
}

const firebaseDocsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USER': {
            return { state, user: state.user = action.payload }
        }

        // GATEGORIES
        case "SET_CATEGORIES": {
            return { state, categories: state.categories = action.payload }
        }

        case "ADD_CATEGORY": {
            return { ...state, categories: state.categories = [...state.categories, action.payload] };
        }

        case "DELITE_CATEGORY": {
            const categories = state.categories.filter((category) => category.id !== action.payload)

            return { ...state, categories: state.categories = [...categories] };
        }

        case "UPDATE_CATEGORY": {
            const categories = [...state.categories]
            const index = categories.findIndex((category) => { return category.id == action.payload.id });
            if (index !== -1) {
                categories[index] = { ...categories[index], ...action.payload }
            }
            return { ...state, categories };
        }


        //CUSTOMERS
        case "SET_CUSTOMERS": {
            return { state, customers: state.customers = action.payload };
        }

        //PRODUCTS
        case 'UPDATE_PRODUCT': {
            const products = [...state.products]
            const index = products.findIndex((product) => { return product.id == action.payload.id });
            if (index !== -1) {
                if (action.payload.newId) {
                    products[index] = { ...products[index], ...action.payload, id: action.payload.newId, newId: null }
                }
                else
                    products[index] = { ...products[index], ...action.payload }
            }
            return { ...state, products };
        }

        case 'ADD_PRODUCT': {
            return { ...state, products: state.products = [...state.products, action.payload] };
        }


        case "SET_FULL_ADMIN_DATA": {
            return {
                state, categories: state.categories = action.payload.categories && action.payload.customers.length > 0 ? action.payload.categories : [],
                customers: state.customers = action.payload.customers && action.payload.customers.length > 0 ? action.payload.customers : [],
                products: state.products = action.payload.products && action.payload.products.length > 0 ? action.payload.products : [],
                carts: state.carts = action.payload.carts && action.payload.carts.length > 0 ? action.payload.carts : [],
            }
        }



        // case 'DELITE_PRODUCT':{
        //     const products = state.products.filter((product) => product.id !== action.payload)

        //     return { ...state, products: state.products = [...products] };}


        default:
            return state;
    }
}


export default firebaseDocsReducer
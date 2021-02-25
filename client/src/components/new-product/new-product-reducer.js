export const productState = {
    name: '',
    description: '',
    price: '',
    category: 'tech',
    images: [],
    errors: ''
}

export const PRODUCT_ACTIONS = {
    SET_NAME: 'set-name',
    SET_DESCRIPTION: 'set-description',
    SET_PRICE: 'set-price',
    SET_CATEGORY: 'set-category',
    SET_IMAGES: 'set-images',
    DELIVER_IMAGES: 'deliver-images'
}

const productReducer = (state, action) => {
    switch(action.type){
        case PRODUCT_ACTIONS.SET_NAME:
            return {...state, name: action.payload};
        case PRODUCT_ACTIONS.SET_DESCRIPTION:
            return {...state, description: action.payload};
        case PRODUCT_ACTIONS.SET_PRICE:
            return {...state, price: action.payload};
        case PRODUCT_ACTIONS.SET_CATEGORY: 
            return {...state, category: action.payload};
        default: 
            return {state}
    }
}

export default productReducer;
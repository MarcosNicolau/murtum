export const infoState = {
    updatedImages: [],
    activeImg: undefined,
    editImage: false,
    name: {
        editName: false,
        nameInput: ''
    },
    price: {
        editPrice: false,
        priceInput: ''
    },
    description: {
        editDescription: false,
        descriptionInput: ''
    }
}

export const INFO_ACTIONS = {
    SET_UPDATED_IMAGES: 'set-updated-imgs',
    DELETE_IMAGE: 'delete-img',
    SET_EDIT_IMG: 'set-edit-img',
    SET_ACTIVE_IMG: 'set-active-img',
    SET_EDIT_NAME: 'set-edit-name',
    SET_NAME_INPUT: 'set-name-input',
    SET_EDIT_PRICE: 'set-edit-price',
    SET_PRICE_INPUT: 'set-price-input',
    SET_EDIT_DESCRIPTION: 'set-edit-description',
    SET_DESCRIPTION_INPUT: 'set-edit-input'
}

const infoReducer = (state, action) => {
    switch(action.type) {
        case INFO_ACTIONS.SET_UPDATED_IMAGES:
            return { ...state, updatedImages: [...state.updatedImages, ...action.payload] }
        case INFO_ACTIONS.SET_EDIT_IMG:
            return { ...state, editImage: !state.editImage }
        case INFO_ACTIONS.DELETE_IMAGE:
            return deleteImg(state, action.payload);
        case INFO_ACTIONS.SET_ACTIVE_IMG:
            return { ...state, activeImg: action.payload };
        case INFO_ACTIONS.SET_EDIT_NAME: 
            return { ...state, name: { ...state.name, editName: !state.name.editName } };
        case INFO_ACTIONS.SET_NAME_INPUT: 
            return { ...state, name: { ...state.name, nameInput: action.payload } };
        case INFO_ACTIONS.SET_EDIT_PRICE: 
            return { ...state, price: { ...state.price, editPrice: !state.price.editPrice } };
        case INFO_ACTIONS.SET_PRICE_INPUT:
            return { ...state, price: { ...state.price, priceInput: action.payload } };
        case INFO_ACTIONS.SET_EDIT_DESCRIPTION:
            return { ...state, description: { ...state.description, editDescription: !state.description.editDescription } };
        case INFO_ACTIONS.SET_DESCRIPTION_INPUT: 
            return { ...state, description: { ...state.description, descriptionInput: action.payload } };
        default: 
            return { ...state };
    }
}

const deleteImg = (state, e) => {
    e.preventDefault();
    const imgToDelete = e.target.previousSibling.src;
    const filterImgs = state.updatedImages.filter(img => img !== imgToDelete );
    return { ...state, updatedImages: filterImgs }
}

export default infoReducer;
import { CREATE_LISTING, UPDATE_LISTING } from "../constant";

const initialState = {
    _id: "",
    create: false,
    update: false,
}



export const actionReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case CREATE_LISTING:
            return {
                create: true
            }
        case UPDATE_LISTING:
            return {
                _id: action.payload,
                update: true
            }
        default:
            return {
                ...state
            }
    }
}
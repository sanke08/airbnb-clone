import { CLOSE_ADD_LISTING, CLOSE_AUTH, OPEN_ADD_LISTING, OPEN_AUTH } from "../constant";

const initialState = {
    openListin: false,
    openAuth: false
}



export const toggleReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case OPEN_ADD_LISTING:
            return {
                openListin: true
            }
        case CLOSE_ADD_LISTING:
            return {
                openListin: false
            }
        case OPEN_AUTH:
            return {
                openAuth: true
            }
        case CLOSE_AUTH:
            return {
                openAuth: false
            }
        default:
            return {
                ...state
            }
    }
}
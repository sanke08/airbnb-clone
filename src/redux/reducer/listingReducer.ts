import { BATHROOM_CNT, CLEAN_UP, DESCRIPTION, GUEST_CNT, LOCATION, PRICE, ROOM_CNT, SET_CATEGORY, TITLE, TYPE } from "../constant";

const initialState = {
    category: "",
    location: {
        state: "",
        country: "",
        street: "",
        address: ""
    },
    bathrooms: 1,
    guests: 2,
    rooms: 1,
    title: "",
    description: "",
    price: 0,
    _id: "",
    type: "room"
}



export const listingReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case SET_CATEGORY:
            return {
                ...state,
                category: action.payload
            }
        case LOCATION:
            return {
                ...state,
                location: {
                    ...state.location,
                    ...action.payload
                }
            }
        case BATHROOM_CNT:
            return {
                ...state,
                bathrooms: action.payload
            }
        case ROOM_CNT:
            return {
                ...state,
                rooms: action.payload
            }
        case GUEST_CNT:
            return {
                ...state,
                guests: action.payload
            }
        case TITLE:
            return {
                ...state,
                title: action.payload
            }
        case DESCRIPTION:
            return {
                ...state,
                description: action.payload
            }
        case PRICE:
            return {
                ...state,
                price: parseInt(action.payload)
            }
        case TYPE:
            return {
                ...state,
                type: action.payload
            }
        case CLEAN_UP:
            return {
                category: "",
                location: "",
                bathrooms: 1,
                guests: 2,
                rooms: 1,
                title: "",
                description: "",
                price: 0,
                _id: ""
            }
        default:
            return {
                ...state
            }
    }
}
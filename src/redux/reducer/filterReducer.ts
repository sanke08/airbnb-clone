import { number } from "zod";
import { CREATE_LISTING, FAMINITIES, FBATHROOMS, FBEDROOMS, FPRICE, FROOMS, FTYPE, UPDATE_LISTING } from "../constant";

const initialState = {
    type: "both",
    bedRooms: undefined,
    rooms: undefined,
    bathRooms: undefined,
    amenities: {
        tv: undefined,
        wifi: undefined,
        ac: undefined,
        kitchen: undefined
    },
    price: {
        minimum: 0,
        maximum: 5000
    }
}



export const filterReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case FTYPE:
            return {
                ...state,
                type: action.payload
            }
        case FBATHROOMS:
            return {
                ...state,
                bathRooms: action.payload
            }
        case FROOMS:
            return {
                ...state,
                rooms: action.payload
            }
        case FBEDROOMS:
            return {
                ...state,
                bedRooms: action.payload
            }
        case FAMINITIES:
            return {
                ...state,
                amenities: {
                    ...state.amenities,
                    ac: state.amenities.ac ?? action.payload.ac,
                    tv: state.amenities.tv ?? action.payload.tv,
                    wifi: state.amenities.wifi ?? action.payload.wifi,
                    kitchen: state.amenities.kitchen ?? action.payload.kitchen,
                }
            }
        case FPRICE:
            return {
                ...state,
                price: {
                    ...state.price,
                    minimum: action.payload.minimum ? parseInt(action.payload.minimum) : state.price.minimum,
                    maximum: action.payload.maximum ? parseInt(action.payload.maximum) : state.price.maximum
                }
            }
        default:
            return {
                ...state
            }
    }
}
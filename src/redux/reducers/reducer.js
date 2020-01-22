import { FETCH_ITEMS_BEGIN, FETCH_ITEMS_SUCCESS, FETCH_ITEMS_FAILURE, CREATE, READ, UPDATE, DELETE } from '../actions/actions'

const initialState = {
    listItems : []
}

export default function (state = initialState, action) {
    switch( action.type ) {
        case CREATE : return {
            listItems : [...state.listItems, action.payload.item]
        }
        case READ : return state
        case UPDATE : {
            const updatedItem = {...action.payload.item}
            return {
                listItems : [...state.listItems].map(item => {
                    if(item.id === updatedItem.id){
                        return updatedItem
                    } else return item
                })
            }
        }
        case DELETE : 
            const id = action.payload.id
            return { 
                listItems : [...state.listItems].filter(item => item.id !== id)
            }
        case FETCH_ITEMS_BEGIN : return {
            ...state,
            loading: true,
            errors: null
        }
        case FETCH_ITEMS_SUCCESS : return {
            ...state,
            loading: false,
            listItems: action.payload.items
        }
        case FETCH_ITEMS_FAILURE: return {
            ...state,
            loading: false,
            errors: action.payload.errors,
            listItems: []
        }
        default: return state
    }
}
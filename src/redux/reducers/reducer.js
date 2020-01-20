import { CREATE, READ, UPDATE, DELETE, updateItem } from '../actions/actions'

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
            const updateItem = {...action.payload.item}
            return {
                listItems : [...state.listItems].map(item => {
                    if(item.id === updateItem.id){
                        return updatedItem
                    } else return item
                })
            }
        }
        case DELETE : return { 
            listItems : [...state.listItems].filter(item => item.id !== id)
        }
        default: return state
    }
}
import axios from "axios"

export const CREATE = 'Add new item'
export const READ = 'Fetch all items'
export const UPDATE = 'Update item'
export const DELETE = 'Delete item'
export const FETCH_ITEMS_BEGIN = 'Begin fetching items'
export const FETCH_ITEMS_SUCCESS = 'Successfuly fetched items'
export const FETCH_ITEMS_FAILURE = 'Failed to fetch items'


export const createItem = (item) => ({
    type: CREATE,
    payload: { item }
})

export const fetchItemsBegin = () => ({
    type: FETCH_ITEMS_BEGIN
})

export const fetchItemsSuccess = (items) => ({
    type: FETCH_ITEMS_SUCCESS,
    payload: { items }
})

export const fetchItemsFailure = (errors) => ({
    type: FETCH_ITEMS_FAILURE,
    payload: { errors }
})

export const readItems = () => {
    return (dispatch) => {
        dispatch(fetchItemsBegin())
        return axios.get('/api/listItems')
            .then(({data}) => {
                dispatch(fetchItemsSuccess(data))
            })
            .catch(error => dispatch(fetchItemsFailure(error)))   
    }
}

export const updateItem = (item) => ({
    type: UPDATE,
    payload: { item }
})

export const deleteItem = (id) => ({
    type: DELETE,
    payload: { id }
})

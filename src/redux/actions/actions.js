export const CREATE = 'Add new item'
export const READ = 'Fetch all items'
export const UPDATE = 'Update item'
export const DELETE = 'Delete item'

export const createItem = (item) => ({
    type: CREATE,
    payload: { item }
})

export const readItems = (item) => ({
    type: READ
})

export const updateItem = (item) => ({
    type: UPDATE,
    payload: { item }
})

export const deleteItem = (id) => ({
    type: DELETE,
    payload: { id }
})


const { fetchItems, addItem, updateItem, deleteItem } = require('./controller')

const routes = [
    {
        method: 'GET',
        url: '/api/listItems',
        handler: fetchItems
    },
    {
        method: 'POST',
        url: '/api/listItems',
        handler: addItem
    },
    {
        method: 'POST',
        url: '/api/listItems/:id',
        handler: updateItem
    },
    {
        method: 'DELETE',
        url: '/api/listItems/:id',
        handler: deleteItem
    }
]

module.exports = routes
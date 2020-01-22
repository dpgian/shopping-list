const { ListItem } = require('./models/listItems')

const fetchItems = async (req, res) => {
    try {
        const listItems = await ListItem.find()
        return listItems
    } catch (err) {
        console.log('Could not fetch items, error: ' + err)
    }
}

const addItem = async (req, res) => {
    try {
        const newItem = new ListItem({ ...req.body })
        return newItem.save()
    } catch (err) {
        console.log('Could not save new item, error: ' + err)
    }
}

const updateItem = async (req, res) => {
    try {
        const { id } = req.params
        const { item } = req.body
        const updatedItem = await ListItem.findOneAndUpdate({id}, item, { new: true })
        return updatedItem
    } catch (err) {
        console.log('Could not update item, error: ' + err)
    }
}

const deleteItem = async (req, res) => {
    try {
        const { id } = req.params
        const listItem = await ListItem.findOneAndDelete({ id })
        return listItem
    } catch (err) {
        console.log('Could not delete item, error: ' + err)
    }
}

module.exports = { fetchItems, addItem, updateItem, deleteItem }



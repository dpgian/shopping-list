import React from 'react'
import ListItem from './components/listIItem'
import Form from './components/form'
import './list.css'
import { connect } from 'react-redux'
import { createItem, deleteItem, updateItem, readItems} from './redux/actions/actions'
import uuid from 'uuid'
import axios from 'axios'

class List extends React.Component {
    constructor(props) {
        super(props)
        
        this.state = {
            openAddForm : false
        }
    }

    componentDidMount() {
        this.props.readItems()
    }

    handleAddClick = () => this.setState({ openAddForm: true })

    handleAddItem = ({ name, amount }) => {
        if ( name == '' ) name = 'No name'
        if ( amount == '' ) amount = '0'

        const newItem = {
            id: uuid.v4(),
            name, amount
        }

        axios.post('/api/listItems', {...newItem })
            .then(() => console.log('Item added.'))
            .catch((err) => console.log('Error creating item, error: ' + err))

        this.props.createItem(newItem)
        this.handleCancel()
    }

    handleDeleteItem = (id) => {
        
        axios.delete(`/api/listItems/${id}`)
            .then(() => console.log('Item deleted.'))
            .catch((err) => console.log('Error deleting item, error: ' + err))

        this.props.deleteItem(id)
    }
        

    handleUpdateItem = (item) => {
        
        axios.put(`api/listItems/${item.id}`, {item})
            .then(() => console.log('Item updated.'))
            .catch((err) => console.log('Error updating item, error: '+ err))
        
        this.props.updateItem(item)
    }

    handleCancel = () => this.setState({ openAddForm: false})

    render() {
        const { loading, errors } = this.props

        return (
            <>
                <h1><i className='fas fa-list-alt'></i>Shopping List</h1>

                <div className='menu'>
                    <div className='heading menu-row'>
                        <div className='list-item-name'>Name</div>
                        <div className='list-item-amount'>Amount</div>
                        <div className='operations'>Operations</div>
                    </div>

                    {
                        this.state.loading ? (
                            <div className='menu-row'>
                                <div className='msg'>Loading Items..</div>
                            </div>
                        ) : this.state.errors ? (
                            <div className='menu-row'>
                                <div className='err msg'>Error while loading items</div>
                            </div>
                        ) : (
                            <>
                                {this.props.listItems.length > 0 ? this.props.listItems.map((item, i) => {
                                    return <ListItem key={item.name + '-' + item.amount + '-' + item.id} id={item.id}
                                                name={item.name} amount={item.amount}
                                                handleDelete={this.handleDeleteItem}
                                                handleUpdate={this.handleUpdateItem}
                                                closeForm={this.handleCancel} />
                                }) : (
                                    <div className='menu-row'>
                                        <div className='msg'>List is empty.</div>
                                    </div>
                                )}
                            </>
                        )
                    }
                </div>

                {!this.state.openAddForm ? (
                    <span onClick={this.handleAddClick} className='add btn'><i className='fas fa-plus'></i></span>
                ) : (
                    <div className='menu'><Form addItem={this.handleAddItem} closeForm={this.handleCancel} /></div>
                )}
            </>
        )
    }
}

const mapStateToProps = ({ listItems, loading, errors }) => ({
    listItems, loading, errors
})

export default connect(mapStateToProps, { createItem, deleteItem, updateItem, readItems })(List)
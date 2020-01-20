import React from 'react'
import ListItem from './components/listIItem'
import Form from './components/form'
import './list.css'
import { connect } from 'react-redux'
import { createItem, deleteItem, updateItem } from './redux/actions/actions'
import uuid from 'uuid'

class List extends React.Component {
    constructor(props) {
        super(props)
        
        this.state = {
            openAddForm : false
        }
    }

    handleAddClick = () => this.setState({ openAddForm: true })

    handleAddItem = ({ name, amount }) => {
        if ( name == '' ) name = 'No name'
        if ( amount == '' ) amount = '0'

        const newItem = {
            id: uuid.v4(),
            name, amount
        }
        this.props.createItem(newItem)
        this.handleCancel()
    }

    handleDeleteItem = (id) => this.props.deleteItem(id)

    handleUpdateItem = (item) => this.props.updateItem(item)

    handleCancel = () => this.setState({ openAddForm: false})

    render() {
        return (
            <>
                <h1><i className='fas fa-list-alt'></i>Shopping List</h1>

                <div className='menu'>
                    <div className='heading menu-row'>
                        <div className='list-item-name'>Name</div>
                        <div className='list-item-amount'>Amount</div>
                        <div className='operations'>Operations</div>
                    </div>

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

                </div>

                {!this.state.openAddForm ? (
                    <span onClick={this.handleAddClick} className='add btn'><i className='fas fa-plus'></i></span>
                ) : (
                    <div className='menu'><Form addItem={this.handleAdditem} closeForm={this.handleCancel} /></div>
                )}
            </>
        )
    }
}

const mapStateToProps = ({ listItems }) => ({
    listItems
})

export default connect(mapStateToProps, { createItem, deleteItem, updateItem })(List)
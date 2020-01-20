import React from 'react'
import Form from './form'

class ListItem extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            name: '',
            amount: null,
            openEditForm: false
        }
    }

    componentDidMount() {
        const { name, amount } = this.props
        this.setState({ name, amount })
    }

    handleClick = () => this.setState({ openEditForm: true })

    handleUpdate = ({ name, amount }) => {
        const updatedItem = {
            id: this.props.id, name, price
        }
        this.props.handleUpdate(updateItem)
        this.handleCancel()
    }

    handleDelete = () => this.props.handleDelete(this.props.id)

    handleCancel = () => this.setState({ openEditForm: false })

    render() {
        return (
            <>
            {
                !this.state.openEditForm ? (
                    <div className='list-row'>
                        <div className='list-item-name'>{this.state.name}</div>
                        <div className='list-item-amount'>{this.state.amount}</div>
                        <div className='operations'>
                            <span onClick={this.handleEditClick} className='btn edit'><i className='fas fa-pen'></i></span>
                            <span onClick={this.handleDelete} className='btn delete'><i className='fas fa-trash'></i></span>
                        </div>
                    </div>
                ) : (
                    <Form name={this.state.name} amount={this.state.amount}
                        closeForm={this.handleCancel} updateItem={this.handleUpdate} />
                )
            }
            </>
        )
    }
}

export default ListItem
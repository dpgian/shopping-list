import React from 'react'

class Form extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            name: !this.props.name ? "" : this.props.name,
            amount: !this.props.name ? "" : this.props.amount
        }
    }

    handleChange = (e) => {
        const { name, value } = e.target
        this.setState({[name] : value})
    }

    handleSubmit = () => {
        const { name, amount } = this.state;
        if (this.props.name && this.props.amount) {
            this.props.updateItem({ name, amount })
        } else {
            this.props.addItem({ name, amount })
        }
    }

    handleCancel = () => this.props.closeForm();

    render(){
        return (
            <form className='menu-row'>
                <div className='list-item-name'>
                    <input value={this.state.name} onChange={this.handleChange}
                        name='name' placeholder='Enter item name' type='text' />
                </div>
                <div className='list-item-amount'>
                    <input value={this.state.amount} onChange={this.handleChange}
                        name='amount' placeholder='Enter quantity' type='text' />
                </div>
                <div className='operations'>
                    <span onClick={this.handleSubmit} className='btn done'>
                        <i className='fas fa-check' />    
                    </span>    
                    <span onClick={this.handleCancel} className='btn cancel'>
                        <i className='fas fa-times' />
                    </span>
                </div>
            </form>
        )
    }
}

export default Form
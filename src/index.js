import React from 'react'
import ReactDOM from 'react-dom'
import List from './list'
import { Provider } from 'react-redux'
import store from './redux/store/store'

const ROOT = document.getElementById('root')

const App = () => {
    return(
        <Provider store={store}>
            <List />
        </Provider>
    )
}

ReactDOM.render(<App />, ROOT)
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import store from 'app/store'

// disable right click
document.oncontextmenu = function () {
  return false;
}

const render = () => {
  const App = require('./app/App').default

  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
  )
}

render()

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./app/App', render)
}


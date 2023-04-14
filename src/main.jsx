import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { Provider } from 'react-redux'
import store from './Redux/store'
// import store,{persistor} from './Redux/store'
// import { PersistGate } from "redux-persist/integration/react";

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <Provider store={store}>
        {/* <PersistGate persistor={persistor}> */}
          <App />
          {/* </PersistGate> */}
      </Provider> 
  // </React.StrictMode>,
)


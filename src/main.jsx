import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
// import "slick-carousel/slick/slick.css";
import firebaseConfig from './firebase.config.js'
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store.js"
import { PersistGate } from 'redux-persist/integration/react'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>,
  <Provider store={store}>
    <PersistGate loading={"loading"} persistor={persistor}>
    <App/>
    </PersistGate>
  </Provider>,
)

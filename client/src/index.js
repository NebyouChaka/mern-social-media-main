import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import authReducer from "./state"
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit"
import { Provider } from "react-redux"
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from "redux-persist"
import storage from "redux-persist/lib/storage"
import { PersistGate } from "redux-persist/integration/react"

const persistConfig = { key: "root", storage, version: 1}
const persistedReducer = persistReducer(persistConfig, authReducer)

const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false
})

const store = configureStore({
  reducer: persistedReducer,
  middleware: customizedMiddleware
})


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistStore(store)}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);





/*
The imported items are constants that are used in various parts of the redux-persist library:

- persistStore is a function that can be used to persist the state of a Redux store to a storage medium, such as local storage.

- persistReducer is a higher-order reducer that can be used to wrap a regular Redux reducer to make it "persistable".

- FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, and REGISTER are action types that are used by the redux-persist library to signal various events in the persistence process.

By using the redux-persist library, you can easily persist the state of your Redux store across sessions, which can help to improve the user experience by allowing users to continue from where they left off.
*/



/*
This code is configuring a Redux store with persisted state. The persistConfig object is used to configure the redux-persist library.

The key property is a string identifier for the state slice that should be persisted. In this case, the key is set to "root", which means that the entire state of the store will be persisted. The storage property is the storage medium that should be used to persist the state, such as local storage. The version property is used to specify the version of the persisted state.

The persistedReducer is created by wrapping the authReducer with the persistReducer function, which makes the state of the authReducer persistable.

The store is created using the configureStore function, which is passed an object with a reducer property set to persistedReducer and a middleware property set to a function that returns the default middleware, with the serializeableCheck option set to ignore the specified actions (FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, and REGISTER) for performance optimization.

In other words, this code sets up a Redux store with persisted state, using the redux-persist library to manage the persistence process. The state of the store will be saved to a storage medium (such as local storage), and will be restored when the app is restarted. The actions specified in the serializeableCheck option will be ignored for performance optimization.
*/
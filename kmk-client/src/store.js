import { applyMiddleware, createStore } from 'redux'
import { persistReducer, persistStore } from 'redux-persist'

import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from './reducers/rootReducer'
import storage from 'redux-persist/lib/storage'
import thunkMiddleware from 'redux-thunk'

const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware))

const persistConfig = {
    key: "root",
    storage,
    blacklist: [
        "album",
        "arrangement", 
        "calendar", 
        "channel", 
        "form", 
        "notification",
        "role"
    ]
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(persistedReducer, composedEnhancer)
export const persistor = persistStore(store)
import { configureStore } from '@reduxjs/toolkit';
import UserRedux from './UserRedux';
import {persistStore,persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const rootreducer={reducer:UserRedux};
const store=configureStore(rootreducer)

//persisting redux
// const persistConfig={
//     key: "hideout",
//     storage 
// }
// const persistedReducer=persistReducer(persistConfig,UserRedux);
// const store = configureStore({
//     reducer:persistedReducer, 
//     middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: false,
// }),});
// export const persistor=persistStore(store)

export default store; 
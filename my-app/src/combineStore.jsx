// store.js
import { configureStore } from '@reduxjs/toolkit';
import reducers from './reducers'; // adjust the path as needed

const store = configureStore({
    reducer: reducers
});

export default store;

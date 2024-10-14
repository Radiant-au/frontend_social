import { configureStore } from '@reduxjs/toolkit';
import Authreducer from './reducers/Authreducer';
import Postreducer from './reducers/Postreducer';

// Create the Redux store using configureStore
const store = configureStore({
  reducer: {
        auth: Authreducer,
        post: Postreducer
  }// Add thunk middleware
});

export default store;

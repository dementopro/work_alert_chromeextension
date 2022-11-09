import { configureStore } from '@reduxjs/toolkit';
import keywordsSlice from './reducers/keywords';
import userSlice from './reducers/userSlice';
import logger from 'redux-logger';

export default configureStore({
  reducer: {
    keywords: keywordsSlice,
    users: userSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['keywords/addKeyword/fulfilled'],
      },
    }).concat(logger),
});

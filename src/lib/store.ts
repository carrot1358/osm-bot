import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import authSlice from './slices/authSlice';
import ncdsBotSlice from './slices/ncdsBotSlice';
import appSlice from './slices/appSlice';
import { RootState } from '@/types/store';

// Redux Persist configuration
const persistConfig = {
  key: 'osm-bot-root',
  storage,
  whitelist: ['auth', 'ncdsBot', 'app'], // Only persist these slices
};

// Combine all reducers
const rootReducer = combineReducers({
  auth: authSlice,
  ncdsBot: ncdsBotSlice,
  app: appSlice,
});

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

// Create persistor
export const persistor = persistStore(store);

// Export types
export type AppDispatch = typeof store.dispatch;

// Typed hooks
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
import { configureStore } from '@reduxjs/toolkit';
import { usersApi } from './usersApi';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { journalsApi } from './journalsAPI';


export const store = configureStore({
    reducer: {
        [usersApi.reducerPath]: usersApi.reducer,
        [journalsApi.reducerPath]: journalsApi.reducer,
    },
    middleware: getDefaultMiddleware =>    
        getDefaultMiddleware().concat(usersApi.middleware, journalsApi.middleware),
});

setupListeners(store.dispatch);

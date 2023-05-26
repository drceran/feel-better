import { configureStore } from '@reduxjs/toolkit';
import { usersApi } from './usersApi';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { messagesApi } from './messagesAPI';
import { journalsApi } from './journalsAPI';


export const store = configureStore({
    reducer: {
        [usersApi.reducerPath]: usersApi.reducer,
        [messagesApi.reducerPath]: messagesApi.reducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(usersApi.middleware, messagesApi.middleware, journalsApi.middleware),

        [journalsApi.reducerPath]: journalsApi.reducer,
    },
);

setupListeners(store.dispatch);

import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { usersApi } from './usersApi';
import { messagesApi } from './messagesAPI';
import { journalsApi } from './journalsAPI';
import { resourcesApi } from "./resourcesApi";
import { appointmentsApi } from "./appointmentsApi"
import { authSlice } from './authSlice';


export const store = configureStore({
    reducer: {
        [usersApi.reducerPath]: usersApi.reducer,
        [messagesApi.reducerPath]: messagesApi.reducer,
        [journalsApi.reducerPath]: journalsApi.reducer,
        [resourcesApi.reducerPath]: resourcesApi.reducer,
        [appointmentsApi.reducerPath]: appointmentsApi.reducer,
        [authSlice.name]: authSlice.reducer,

    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            usersApi.middleware,
            messagesApi.middleware,
            journalsApi.middleware, resourcesApi.middleware, appointmentsApi.middleware
        ),
});

setupListeners(store.dispatch);

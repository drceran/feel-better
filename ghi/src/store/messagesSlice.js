import { createSlice } from '@reduxjs/toolkit';


const messagesSlice = createSlice({
    name: 'messages',
    initialState: {
        selectedMessage: null,
    },
    reducers: {
        selectMessage: (state, action) => {
            state.selectedMessage = action.payload;
        },
    },
});


export const { selectMessage } = messagesSlice.actions;
export const messagesReducer = messagesSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';


// const initialState = {
//     messages: [],
//     sender : '',
//     recipient : '',
//     subject : '',
//     body : '',
//     cost : '',
//     timestamp : '',
// };

// const messagesSlice = createSlice({
//     name: 'messages',
//     initialState,
// });

// export default messagesSlice.reducer;

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

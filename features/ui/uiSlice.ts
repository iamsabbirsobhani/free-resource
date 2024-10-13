import { createSlice } from '@reduxjs/toolkit';

interface UiState {
    count: number;
}

const initialState: UiState = {
    count: 50,
};

export const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        countUp: (state: { count: number }) => {
            state.count++;
        },
    }
});

export const {
    countUp,
} = uiSlice.actions;

export default uiSlice.reducer;
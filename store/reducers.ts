import { combineReducers } from '@reduxjs/toolkit';
import uiReducer from '@/features/ui/uiSlice';

const rootReducer = combineReducers({
    ui: uiReducer,
});

export default rootReducer;
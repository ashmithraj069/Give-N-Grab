import{configureStore} from '@reduxjs/toolkit'
import authSlice from './authSlice';
import itemSlice from './itemSlice';
import requestSlice from './requestSlice';
const store = configureStore({
    reducer:{
        auth:authSlice,
        items:itemSlice,
        requests:requestSlice,
    }
})

export default store
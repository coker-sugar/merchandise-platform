// 创建reducer
import { configureStore } from '@reduxjs/toolkit';
import {reducerExmple} from '../reducer/index.ts'
import {authReducer}  from '../reducer/user.ts'

const store = configureStore({
    reducer:{
        exmple:reducerExmple,
        auth:authReducer
    }
})

export type AppDispatch = typeof store.dispatch;

export default store;
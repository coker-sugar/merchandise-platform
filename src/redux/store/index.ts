// 创建reducer
import { configureStore } from '@reduxjs/toolkit';
import {reducer} from '../reducer/index.ts'

const store = configureStore({
    reducer
})
 
export default store
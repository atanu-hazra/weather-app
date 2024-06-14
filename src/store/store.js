import { configureStore } from '@reduxjs/toolkit'
import weatherSliceReducer from './weatherSlice'

const store = configureStore({
    reducer: {
        weather: weatherSliceReducer,
    }
})

export default store
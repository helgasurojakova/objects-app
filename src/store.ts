import { configureStore } from '@reduxjs/toolkit'
import { objectsReducer } from './reducer'

export default configureStore({
  reducer: {
    objects: objectsReducer,
  },
})

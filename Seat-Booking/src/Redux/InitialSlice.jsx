import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: 0,
  }

  export const InitialSlice = createSlice({
    name: 'initialSice',
    initialState,
    reducers: {
        increment:(state,action) => {
            state.value += action.payload
        }
    },
  })

  export const { increment } = InitialSlice.actions
  export default InitialSlice.reducer
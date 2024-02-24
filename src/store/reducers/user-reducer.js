import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  name: '',
  email: '',
  token: ''
}

export const userSlice = createSlice({
  name: 'user-reducers',
  initialState,
  reducers: {
    setName: (state, action) => {
      state.name = action.payload
    },
    setToken: (state, action) => {
      state.token = action.payload
    },
    setEmail: (state, action) => {
      state.email = action.payload
    }
  }
})

export const { setName, setToken, setEmail } = userSlice.actions

export default userSlice.reducer

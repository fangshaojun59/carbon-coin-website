import { createSlice } from '@reduxjs/toolkit'

const initState = {
  user: {},
  address: '',
  spining: 0,
}

const user = createSlice({
  name: 'userInfo',
  initialState: initState,
  reducers: {
    SaveUser: (state, action) => {
      state.user = action.payload
    },
    SaveAddress: (state, action) => {
      state.address = action.payload
    },
    addSpining: (state) => {
      state.spining += 1
    },
    delSpining: (state) => {
      state.spining -= 1
    },
  },
})

export const { SaveUser, SaveAddress, addSpining, delSpining } = user.actions

export const selectAddress = (state: any) => state.user.address
export const selectUserInfo = (state: any) => state.user.user
export const selectSpining = (state: any) => state.user.spining

export default user.reducer

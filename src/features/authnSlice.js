import { createSlice } from '@reduxjs/toolkit';

export const authnSlice = createSlice({
  name: 'authn',
  initialState: {
    user: null,
  },
  reducers: {
    setUser: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.user = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { setUser } = authnSlice.actions

export default authnSlice.reducer
import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit';
import { getCallBackendURL, getPostCall } from '../../pages/Popup/api/Apicalls';
import localStorageService from '../../pages/Popup/api/localStorageService';
import { getUserInfoFromStorage } from '../../pages/Popup/utils';

export const fetchUsers = createAsyncThunk(
  'users/getUsers',
  async (reqPayload, { rejectWithValue, getState, dispatch }) => {
    try {
      if (reqPayload?.email && reqPayload?.password) {
        var data;
        data = JSON.stringify({
          email: reqPayload.email,
          password: reqPayload.password,
        });
        let usersData = await getPostCall('login', 'post', data);
        localStorageService.setItem('Users', usersData.data);
        chrome.storage.local.set({ Users: usersData.data });
        return usersData.data;
      } else {
        let usersStorageData = await getUserInfoFromStorage();
        if (usersStorageData) {
          let usersData = await getCallBackendURL(
            'user',
            'get',
            usersStorageData?.token
          );
          localStorageService.setItem('Users', usersData.data);
          chrome.storage.local.set({ Users: usersData.data });
          return usersData.data;
        }
      }
    } catch (error) {
      return rejectWithValue(null);
    }
  }
);

const userSlice = createSlice({
  name: 'users',
  initialState: {
    users: null,
    user_loading: false,
  },
  reducers: {
    setUsers: (state, action) => {
      if (action.payload) state.users = action.payload;
    },
    removeUsers: () => {
      if (action.payload) state.users = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        console.log('something wrong happened, please try again later');
      });
  },
});

// Action creators are generated for each case reducer function
export const { setUsers, getUsers, removeUsers } = userSlice.actions;

export default userSlice.reducer;

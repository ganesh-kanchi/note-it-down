import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginRequest } from "requests/authRequests";

const initialState = {
    token: localStorage.getItem("token") || null,
    user: localStorage.getItem("user") || null,
    isLoading: false,
}

export const loginHandler= createAsyncThunk(
    "auth/loginHandler",

    async (credentials, { rejectWithValue }) => {
        const {login, setLogin} = credentials;

        try {
            const { data, status } = await loginRequest(login.input);

            if (status === 200) {
                localStorage.setItem("token", data.encodedToken);
                localStorage.setItem("user", JSON.stringify(data.foundUser));
                return data;
            }
        } catch (error) {
            setLogin((prevValue) => ({...prevValue, error: error.response.statusText }));
            console.log(error.response)
            return rejectWithValue([], false);
        }
    }

)

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logoutHandler: (state) => {
            state.token = null;
            localStorage.removeItem("token");
            localStorage.removeItem("user");
        }
    },
    extraReducers: {
        [loginHandler.fulfilled]: ( state, { payload } ) => {
            state.token = payload.encodedToken;
            state.user = payload.foundUser;
            state.isLoading = false; 
        },
        [loginHandler.pending]: (state) => {
            state.isLoading = true;
        }
    }
})

export const { logoutHandler } = authSlice.actions;
export default authSlice.reducer;
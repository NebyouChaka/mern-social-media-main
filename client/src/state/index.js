import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    mode: "light",
    user: null,
    token: null,
    posts: []
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setMode: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light";
        },
        setLogin: (state, action) => {
            state.user = action.payload.user
            state.token = action.payload.token
        },
        setLogout: (state) => {
            state.user = null
            state.token = null
        },
        setFriends: (state, action) => {
            if(state.user) {
                state.user.friends = action.payload.friends
            } else {
                console.error("user friends non-existent")
            }
        },
        setPosts: (state, action) => {
            state.post = action.payload.posts
        },
        setPost: (state, action) => {
            const updatedPosts = state.posts.map((post) => {
                if(post._id === action.payload.post_id) return action.payload.post
                return post
            })
            state.posts = updatedPosts
        }
    }
})

export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost } = authSlice.actions // exporting the action creators
export default authSlice.reducer //exporting the reducer. The reducer function is used to update the state based on the actions that are dispatched, it is passed to the reducer function, which uses the action type and payload to determine how to update the state.


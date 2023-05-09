import {createAsyncThunk, createSlice, isFulfilled, isPending, isRejectedWithValue} from "@reduxjs/toolkit";
import {IAlbum, IComment, IErrorPlaceHolder, IPost, ITodos, IUser} from "../interfeces";
import {userService} from "../services";
import {AxiosError} from "axios";


interface IState {
    comments: IComment[],
    posts: IPost[],
    albums: IAlbum[],
    todos: ITodos[],
    users: IUser[],
    postById: IPost,
    postsByUser: IPost[],
    commetsByPost: IComment[],
    errors: IErrorPlaceHolder,
    loading: boolean
}


const initialState: IState = {
    comments: [],
    posts: [],
    albums: [],
    todos: [],
    users: [],
    postById: null,
    postsByUser: [],
    commetsByPost: [],
    errors:{
        users:null,
        albums:null
    },
    loading: false,
}


const getAll = createAsyncThunk<IUser[], void>(
    'placeholderSlice/getAll',
    async (_, thunkAPI) => {
        try {
            const {data} = await userService.getAll()
            return thunkAPI.fulfillWithValue(data)
        } catch (e) {
            const err = e as AxiosError
            return thunkAPI.rejectWithValue(err.response.data)

        }


    }
)


const slice = createSlice({
    name: 'placeholderSlice',
    initialState,
    reducers: {
        set_AllPosts: (state, action) => {
            state.posts = action.payload
        },
        set_AllComments: (state, action) => {
            state.comments = action.payload
        },
        set_AllAlbums: (state, action) => {
            state.albums = action.payload
        },
        set_AllTodos: (state, action) => {
            state.todos = action.payload
        },
        set_Post: (state, action) => {
            state.postById = action.payload
        },
        set_PostsByUser: (state, action) => {
            state.postsByUser = action.payload
        },
        set_CommentByPost: (state, action) => {
            state.commetsByPost = action.payload
        },
    }, extraReducers: builder =>
        builder
            .addCase(getAll.fulfilled, (state, action) => {
                state.users = action.payload
            })
            .addMatcher(isPending(), (state) => {
                state.loading=true
                state.errors.users=null

            })
            .addMatcher(isFulfilled(), state => {
                state.loading = false
                state.errors.users = null

            })
            .addMatcher(isRejectedWithValue(), (state, action) => {
                state.errors.users = action.payload as string
            })
})


const {reducer: reducerPlaceholder, actions} = slice


const placeholderActions = {
    ...actions,
    getAll
}

export {
    placeholderActions,
    reducerPlaceholder
}
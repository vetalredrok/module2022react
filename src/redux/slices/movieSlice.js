import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";

import {moviesService} from "../../services";




const getAllGenres = createAsyncThunk(
  'moviesSlice/getAllGenres',
  async (_, {rejectWithValue}) =>{
      try {
          const {data} = await moviesService.allGenres();
          console.log(data);
          const {genres} = data;
          return genres;
      } catch (e) {
          return rejectWithValue(e.response.data);
      }
  }
);

const getTopRated = createAsyncThunk(
    'moviesSlice/getTopRated',
    async ({page}, {rejectWithValue})=>{
        try {
            const {data} = await moviesService.getTopRated(page);
            const {results} = data;
            return results;
        } catch (e) {
            console.log(e);
            return rejectWithValue(e.response.data);
        }
    }
);

const getByGenre = createAsyncThunk(
    'moviesSlice/getByGenre',
    async ({genre, page}, {rejectWithValue})=>{
        try {
            const {data} = await moviesService.getByGenre(genre,page);
            console.log(data);
            const {results} = data;
            console.log(results);
            const obj ={
                id: genre,
                results: results
            }
            console.log(obj);
            return obj;
        } catch (e) {
            console.log(e);
            return rejectWithValue(e.response.data);
        }
    }
);


const initialState = {
    topRated: [],
    barFirst: [],
    genres: [],
    loading: false,
    error: null

};

const moviesSlice = createSlice({
    name: 'moviesSlice',
    initialState,
    reducers: {
        deleteFromRow: (state, action) => {
            const index = state.barFirst.findIndex(value => value.id === action.payload);
            state.barFirst.splice(index, 1);
        }
    },
    extraReducers: builder => {
        builder
            .addCase(getTopRated.fulfilled, (state, action) => {
                state.topRated = action.payload;
                state.errors = null;
                state.loading = false;
            })
            .addCase(getTopRated.pending, (state, ) => {
                state.loading = true;
            })
            .addCase(getByGenre.pending, (state) => {
                state.loading = true;
            })
            .addCase(getByGenre.fulfilled, (state, action) => {
                state.barFirst.push(action.payload);
                console.log(state.barFirst);
                state.loading = false;
            })
            .addCase(getAllGenres.fulfilled, (state, action) => {
                state.genres = action.payload;
            })
            .addDefaultCase((state, action) => {
                const [pathElement] = action.type.split('/').splice(-1);
                if(pathElement === 'rejected'){
                    state.errors = action.payload;
                    state.loading = false;
                }
            })
    }
});

const {reducer: moviesReducer, actions:{deleteFromRow}} = moviesSlice;

const moviesActions = {
    getTopRated,
    getByGenre,
    deleteFromRow,
    getAllGenres
};

export {moviesReducer, moviesActions};

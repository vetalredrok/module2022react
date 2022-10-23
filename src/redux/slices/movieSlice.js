import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";

import {moviesService} from "../../services";




const getAllGenres = createAsyncThunk(
  'moviesSlice/getAllGenres',
  async (_, {rejectWithValue}) =>{
      try {
          const {data} = await moviesService.allGenres();
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
            const obj ={
                id: genre,
                results: results
            }
            return obj;
        } catch (e) {
            return rejectWithValue(e.response.data);
        }
    }
);

const getFromAll = createAsyncThunk(
    'moviesSlice/getFromAll',
    async ({page}, {rejectWithValue}) => {
        try {
            const {data} = await moviesService.getPageOfAll(page);
            const {results} = data;
            return results;
        } catch (e) {
            return rejectWithValue(e.response.data);
        }

    }
);

const getFromSearch = createAsyncThunk(
  'moviesSlice/getFromSearch',
  async ({request, page}, {rejectWithValue}) =>{
      try {
          const {data} = await moviesService.searchMovie(request, page);
          return data;
      } catch (e) {
          return rejectWithValue(e.response.data);
      }
  }

);

const discoverByGenre = createAsyncThunk(
    'moviesSlice/discoverByGenre',
    async ({genre, page},  {rejectWithValue}) => {
        try {
            const {data} = await moviesService.discoverByGenre(genre, page);
            console.log(data);
            return data;
        } catch (e) {
            return rejectWithValue(e.response.data);
        }
    }
)


const initialState = {
    topRated: [],
    barFirst: [],
    genres: [],
    resultRandom: [],
    forAll: [],
    fromSearch: {},
    withGenre: {},
    selectedGenre: '',
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
        },
        setResultRandom: (state, action) =>{
            state.resultRandom = action.payload;
        },
        setResultRandomToEmpty: (state) =>{
            state.resultRandom = [];
        },
        setGenre: (state, action) => {
            state.selectedGenre = action.payload
            console.log(state.selectedGenre)
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
            .addCase(getFromAll.pending, state => {
                state.loading = true;
            })
            .addCase(getFromAll.fulfilled, (state, action) => {
                state.forAll = action.payload;
                state.loading = false;
            })
            .addCase(getFromSearch.fulfilled, (state, action) => {
                state.fromSearch = action.payload;
                state.loading = false;
            })
            .addCase(discoverByGenre.fulfilled, (state, action) => {
                state.withGenre = action.payload;
                state.loading = false;
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

const {reducer: moviesReducer, actions:{deleteFromRow, setResultRandom, setResultRandomToEmpty, setGenre}} = moviesSlice;

const moviesActions = {
    getTopRated,
    getByGenre,
    deleteFromRow,
    getAllGenres,
    setResultRandom,
    getFromAll,
    setResultRandomToEmpty,
    getFromSearch,
    setGenre,
    discoverByGenre
};

export {moviesReducer, moviesActions};

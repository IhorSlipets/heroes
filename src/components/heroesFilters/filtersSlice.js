import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import { useHttp } from '../../hooks/http.hook';

const filtersAdapter = createEntityAdapter({
    selectId: (filters) => filters.name
});

// const initialState = {
//     filters: [],
//     filtersLoadingStatus: 'idle',
//     activeFilter: 'all'
// }

const initialState = filtersAdapter.getInitialState({
    filtersLoadingStatus: 'idle',
    activeFilter: 'all'    
});

export const fetchedFilters = createAsyncThunk(
    'filters/fetchedFilters',
    async () => {
        const { request } = useHttp();
        return await request("http://localhost:3001/filters");
    }
);

const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        filtersFetching: state => {
            state.filtersLoadingStatus = 'loading';
        },
        filtersFetched: (state, action) => {
            state.filtersLoadingStatus = 'idle';
            // state.filters = action.payload;
            filtersAdapter.setAll(state, action.payload);
        },
        filtersFetchingError: state => {
            state.filtersLoadingStatus = 'error';
        },
        activeFilterChanged: (state, action) => {
            state.activeFilter = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase( fetchedFilters.pending, state => {
            state.filtersLoadingStatus = 'loading';
            })
            .addCase( fetchedFilters.fulfilled, (state, action) => {
            state.filtersLoadingStatus = 'idle';
            // state.filters = action.payload;
            filtersAdapter.setAll(state, action.payload);
            })
            .addCase( fetchedFilters.rejected, state => {
            state.filtersLoadingStatus = 'error';
            })
            .addDefaultCase(() => {})
    }
});

const { actions, reducer } = filtersSlice;

export default reducer;

export const { selectAll } = filtersAdapter.getSelectors(state => state.filters);

export const {
    filtersFetching,
    filtersFetched,
    filtersFetchingError,
    activeFilterChanged
} = actions;
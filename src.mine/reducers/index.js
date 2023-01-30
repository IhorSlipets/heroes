const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
    filtersLoadingStatus: 'idle',
    filterActive: 'all',
    filters: [],
    filteredHeroes: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'HEROES_FETCHING':
            return {
                ...state,
                heroesLoadingStatus: 'loading'
            }
        case 'HEROES_FETCHED':
            const newFechHeroes = state.filterActive === 'all' ? state.heroes : state.heroes.filter(item => item.element === state.filterActive);
            return {
                ...state,
                heroes: action.payload,
                heroesLoadingStatus: 'idle',
                filteredHeroes: action.payload,
                filteredHeroes: newFechHeroes
            }
        case 'HEROES_FETCHING_ERROR':
            return {
                ...state,
                heroesLoadingStatus: 'error'
            }
        case 'FILTERS_FETCHING':
            return {
                ...state,
                filtersLoadingStatus: 'loading'
            }
        case 'FILTERS_FETCHED':
            return {
                ...state,
                filters: action.payload,
                filtersLoadingStatus: 'idle'
            }
        case 'FILTERS_FETCHING_ERROR':
            return {
                ...state,
                filtersLoadingStatus: 'error'
            }
        case 'SET_ACTIVE_FILTER':
            const newFHeroes = action.payload === 'all' ? state.heroes : state.heroes.filter(item => item.element === action.payload);
            return {
                ...state,
                filterActive: action.payload,
                filteredHeroes: newFHeroes
            }
        case 'HERO_DELETING':
            const newHeroes = state.heroes.filter(item => item.id !== action.payload);
            const newDelHeroes = state.filterActive === 'all' ? state.heroes : state.heroes.filter(item => item.element === state.filterActive);
            return {
                ...state, 
                heroes: newHeroes,
                filteredHeroes: newDelHeroes    
            }
        case 'HERO_ADDING':
            const addHeroes = [...state.heroes, action.payload];
            const newAddHeroes = state.filterActive === 'all' ? state.heroes : state.heroes.filter(item => item.element === state.filterActive);
            return {
                ...state, 
                heroes: addHeroes,
                filteredHeroes: newAddHeroes
            }
        default: return state
    }
}

export default reducer;
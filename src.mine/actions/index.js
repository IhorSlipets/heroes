export const heroesFetching = () => {
    return {
        type: 'HEROES_FETCHING'
    }
}

export const heroesFetched = (heroes) => {
    return {
        type: 'HEROES_FETCHED',
        payload: heroes
    }
}

export const heroesFetchingError = () => {
    return {
        type: 'HEROES_FETCHING_ERROR'
    }
}

export const filtersFetching = () => {
    return {
        type: 'FILTERS_FETCHING'
    }
}

export const filtersFetched = (filters) => {
    return {
        type: 'FILTERS_FETCHED',
        payload: filters
    }
}

export const filtersFetchingError = () => {
    return {
        type: 'FILTERS_FETCHING_ERROR'
    }
}

export const heroDeleting = (id) => {
    return {
        type: 'HERO_DELETING',
        payload: id
    }
}

export const heroAdding = (hero) => {
    return {
        type: 'HERO_ADDING',
        payload: hero
    }
}

export const activeFilter = (name) => {
    return {
        type: 'SET_ACTIVE_FILTER',
        payload: name
    }
}
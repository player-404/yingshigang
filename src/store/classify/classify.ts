interface State {
    genres: string,
    classify: string,
    year: string,
    language: string,
    sort: string
}

const classify = {
    namespaced: true,
    state: {
        genres: 'all',
        classify: 'movie',
        language: 'all',
        year: '',
        sort: 'popularity.desc'
    },
    mutations: {
        setGenres(state: State, payload: string) {
            state.genres = payload;
        },
        setClassify(state: State, payload: string) {
            state.classify = payload;
        },
        setYear(state: State, payload: string) {
            state.year = payload;
        },
        setLanguage(state: State, payload: string) {
            state.language = payload;
        },
        setSort(state: State, payload: string) {
            state.sort = payload;
        }
    }
}
export default classify
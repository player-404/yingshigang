interface State {
    keyword: string
}
const state: State = {
    keyword: ''
}
export const search = {
    namespaced: true,
    state,
    mutations: {
        setKeyword(state: State, payload: string): void {
            state.keyword = payload;
        }
    }
}
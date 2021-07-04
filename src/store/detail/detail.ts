interface State {
    index: number
}

export const detail = {
    namespaced: true,
    state: {
        index: 0
    },
    mutations: {
        changeIndex(state: State, payload: number): void {
            state.index = payload
        }
    }
}
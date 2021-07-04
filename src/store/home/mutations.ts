import { State } from './untils'
const mutations = {
    //电视类型检索
    setTvGenres(state: State, payload: any[]): void {
        state.tvGenres = payload;
    },
    //电影类型检索
    setMovieGenres(state: State, payload: any[]): void {
        state.movieGenres = payload;
    }
}
export default mutations;
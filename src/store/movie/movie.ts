import actions from './actions'
import state from './state'
import mutations from './mutations'
const movie = {
    namespaced: true,
    state,
    mutations,
    actions
}
export default movie
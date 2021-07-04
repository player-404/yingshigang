import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'
import home from './home/home'
import classify from './classify/classify'
import { search } from './search/search'
import { detail } from './detail/detail'
// 为 store state 声明类型
export interface State {
  count: number
}

// 定义 injection key
export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state: {
    count: 0
  },
  modules: {
    home,
    classify,
    search,
    detail
  }
})
export function useStore () {
  return baseUseStore(key)
}
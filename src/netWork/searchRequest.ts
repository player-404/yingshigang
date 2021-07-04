import request from "./request";
import { Obj } from '@/types/index'
//电影搜索
export function movieSearch(keyword: string, page: number = 1): Promise<Obj> {
    return request({
        method: 'GET',
        url: '/search/movie',
        params: {
            query: keyword,
            page
        }
    })
}

//电视搜索
export function tvSearch(keyword: string, page: number = 1): Promise<Obj> {
    return request({
        method: 'GET',
        url: '/search/tv',
        params: {
            query: keyword,
            page
        }
    })
}

//演员搜索
export function PeopleSearch(keyword: string, page: number = 1): Promise<Obj> {
    return request({
        method: 'GET',
        url: '/search/person',
        params: {
            query: keyword,
            page
        }
    })
}
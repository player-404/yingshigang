import request from "./request";
import { Obj } from '@/types/index'
//演员参与作品列表
export function combinedCredits(personId: number): Promise<Obj> {
    return request({
        method: 'GET',
        url: `/person/${personId}/combined_credits`
    })
}
//演员信息
export function getInfo(personId: number): Promise<Obj> {
    return request({
        method: 'GET',
        url: `/person/${personId}`
    })
}

//演员知名作品
export function coutMovie(personId: number): Promise<Obj> {
    return request({
        method: 'GET',
        url: '/discover/movie/',
        params: {
            'with_people': personId,
            'sort_by': 'vote_count.desc'
        }
    })
}
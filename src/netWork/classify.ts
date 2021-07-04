import request from "./request";
import { nowTime } from '@/views/classify/utils/tool'
interface Year {
    max: string,
    min: string
}

export function movieDisCover(classify: string = 'movie', genres: string = '', language: string = '', year: any = '', pages: number = 1, sort: string = '') {
    const startTime: string = classify === 'tv' ? 'first_air_date.gte' : 'primary_release_date.gte';
    const endTime: string = classify === 'tv' ? 'first_air_date.lte' : 'primary_release_date.lte';
    return request({
        url: `/discover/${classify}`,
        method: 'GET',
        params: {
            [endTime]: year?.max || nowTime().fullTime,
            [startTime]: year?.min,
            with_genres: genres,
            with_original_language: language,
            page: pages,
            sort_by: sort,
            'vote_count.gte': 1000
        }
    })
}

//搜索
export function search(keyword: string): any {
    return request({
        url: '/search/multi',
        method: 'GET',
        params: {
            query: keyword
        }
    })
}
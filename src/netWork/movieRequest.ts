import request from './request'

//电影排行
export function getTop(page: number) {
    return request({
        url: '/movie/top_rated',
        method: 'GET',
        params: {
            page
        }
    })
}

//最近上映
export function upComming(page: number = 1) {
    return request({
        url: '/movie/upcoming',
        method: 'GET',
        params: {
            page
        }
    })
}

//正在热映
export function nowPlaying(page: number = 1) {
    return request({
        url: '/movie/now_playing',
        method: 'GET',
        params: {
            page
        }
    })
}

//电影排行
export function topRate(page?: number) {
    return request({
        url: '/movie/top_rated',
        method: 'GET',
        params: {
            page
        }
    })
}

//电影语言分类
export function original(language: string, sort_by: string = "popularity.desc", date?: string, page: number = 1): Promise<any> {
    return request({
        url: '/discover/movie',
        method: 'GET',
        params: {
            with_original_language: language,
            sort_by,
            'release_date.lte': date,
            page
        }
    })
}

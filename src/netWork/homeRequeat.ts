import request from './request'
//热门电影数据
export function getMPopular() {
    return request({
        url: '/movie/popular',
        method: 'GET'
    })
}

// 热门电视
export function getTVPopular(page: number = 1): Promise<any> {
    return request({
        url: '/tv/popular',
        method: 'GET',
        params: {
            page
        }
    })
}

//发现电视
export function discoverTvGenres(genres?: string) {
    return request({
        url: '/discover/tv',
        method: "GET",
        params: {
            'with_genres': genres
        }
    })
}
//发现电影
export function discoverMovie(genres?: string): unknown {
    return request({
        url: '/discover/movie',
        method: 'GET',
        params: {
            'with_genres': genres
        }
    })
}

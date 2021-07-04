import request from './request'

//电影详情
export function getMovieDetail(id: string): any {
    return request({
        url: `/movie/${id}`,
        method: 'GET'
    })
}

//电影图片
export function getMovieImages(id: number): any {
    return request({
        url: `/movie/${id}/images`,
        method: 'GET',
        params: {
            language: 'null'
        }
    })
}

//电影主演列表
export function getMovieCredits(id: number): any {
    return request({
        url: `/movie/${id}/credits`,
        method: 'GET'
    })
}

//电视节目详情
export function getTVDetail(id: string): any {
    return request({
        url: `/tv/${id}`,
        method: 'GET'
    })
}

//电视剧照
export function getTvImage(id: unknown): any {
    return request({
        url: `/tv/${id}/images`,
        method: 'GET',
        params: {
            language: 'null'
        }
    })
}

//电视季数详情
export function getTvSeason(TvId: number, TvSeason: number = 1): any {
    return request({
        url: `/tv/${TvId}/season/${TvSeason}`,
        method: 'GET'
    })
}

//电视主演列表
export function getCredits(TvId: number): any {
    return request({
        url: `/tv/${TvId}/credits`,
        method: 'GET'
    })
}
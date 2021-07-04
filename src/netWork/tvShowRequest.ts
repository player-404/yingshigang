import request from "./request";
//电视排行
export function tvRate(page: number = 1) {
    return request({
        url: '/tv/top_rated',
        method: 'GET',
        params: {
            page
        }
    })
}
//今日播出
export function airingToday(page: number = 1) {
    return request({
        url: '/tv/airing_today',
        method: "GET",
        params: {
            page
        }
    })
}
//即将播出
export function onTheAir(page: number = 1) {
    return request({
        url: '/tv/on_the_air',
        method: 'GET',
        params: {
            page
        }
    })
}

//语言分类
export function tvOriginal(page: number = 1, language: string = 'zh', sort: string = 'popularity.desc') {
    return request({
        url: '/discover/tv',
        method: 'GET',
        params: {
            page,
            'with_original_language': language,
            'sort_by': sort
        }
    })
}
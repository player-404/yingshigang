import { upComming, nowPlaying, topRate, original } from '@/netWork/movieRequest'
import { airingToday, onTheAir, tvRate, tvOriginal } from '@/netWork/tvShowRequest'
import { Obj } from '@/types/index'
import { getNow } from '@/utils/tool'
interface Data {
    data: any[],
    totalPages: string
}
interface Mtext {
    upcomming: string,
    popular: string,
    top: string,
    cn: string
}
interface Tvtext {
    arringTody: string,
    ontheair: string,
    top: string,
    cn: string
}
export const movieText: Mtext = {
    upcomming: '正在热映',
    popular: '流行',
    top: 'TMDB高分排行',
    cn: '国内'
}
export const tvText: Tvtext = {
    arringTody: '今日播放',
    ontheair: '即将播放',
    top: 'TMDB口碑榜',
    cn: '热门'
}
export async function getMovieUpcomming(page: number = 1): Promise<Data> {
    const data = await upComming(page);
    return {
        data: data.data.results,
        totalPages: data.data['total_pages']
    };
}

export async function getData(type: string, name: string, page?: number): Promise<any> {
    if (type === 'movie') {
        if (name === 'upcoming') {
            let data: Obj = await getMovieUpcomming(page);
            return {
                data: data.data,
                totalPages: data.totalPages
            }
        }
        if (name === 'popular') {
            let data: Obj = await nowPlaying(page);
            return {
                data: data.data.results,
                totalPages: data.data.total_pages
            }
        }
        if (name === 'top') {
            let data: Obj = await topRate(page);
            return {
                data: data.data.results,
                totalPages: data.data.total_pages
            }
        }
        if (name === 'cn') {
            let date: string = getNow();
            let data: Obj = await original('zh', "release_date.desc", date, page);
            return {
                data: data.data.results,
                totalPages: data.data.total_pages
            }
        }

    }
    if (type === 'TV') {
        if (name === 'arringTody') {
            let data: Obj = await airingToday(page);
            return {
                data: data.data.results,
                totalPages: data.data['total_pages']
            }
        }
        if (name === 'ontheair') {
            let data: Obj = await onTheAir(page);
            return {
                data: data.data.results,
                totalPages: data.data['total_pages']
            }
        }
        if (name === 'top') {
            let data: Obj = await tvRate(page);
            return {
                data: data.data.results,
                totalPages: data.data['total_pages']
            }
        }
        if (name === 'cn') {
            let data: Obj = await tvOriginal(page);
            return {
                data: data.data.results,
                totalPages: data.data['total_pages']
            }
        }
    }

}
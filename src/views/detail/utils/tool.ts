import { getMovieDetail, getTVDetail, getTvSeason, getCredits, getMovieCredits } from '@/netWork/detailRequest'
import { getTvImage, getMovieImages } from '@/netWork/detailRequest'
//获取数据
export async function getData(type: unknown, id: string) {
    if (type === 'movie') {
        const data = await getMovieDetail(id)
        return data;
    }
    if (type === 'TV') {
        const data = await getTVDetail(id);
        return data;
    }
}
//获取图片
export async function getImage(type: unknown, id: unknown) {
    if (type === 'movie') {
        const data = await getMovieImages(id as number);
        return data;
    }
    if (type === 'TV') {
        const data = await getTvImage(id);
        return data;
    }
}
//接口
export interface Obj {
    [propName: string]: any
}
interface ActorInfo {
    actors: any[]
}
//获取演员列表详细信息
export async function getTvSeasonData(id: number, TvSeason?: number) {
    let info: [] = [];
    const data: Obj = await getTvSeason(id, TvSeason);
    const result: Obj = data.data;
    (result.episodes as any[]).forEach(item => {
        info.push(...item.guest_stars as [])
    });
    return Promise.resolve(info)
}
//主演列表
export async function getCreditsData(type: unknown, tvId: number) {
    if (type === 'TV') {
        const data: Obj = await getCredits(tvId);
        return data.data.cast;
    }
    if (type === 'movie') {
        const data: Obj = await getMovieCredits(tvId);
        return data.data.cast;
    }

}
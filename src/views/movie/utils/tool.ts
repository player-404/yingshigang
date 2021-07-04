import { getTop, upComming, nowPlaying, topRate, original } from '@/netWork/movieRequest'
import { getNow } from '@/utils/tool'
interface Obj {
    [propName: string]: any
}
export async function getTopData(): Promise<[]> {
    let page = Math.trunc(Math.random() * 50 + 1);
    const data = await getTop(page)
    return data.data.results;
}

//最近上映
export async function getUpCommingData(): Promise<[]> {
    const data = await upComming();
    return data.data.results
}

//正在热映
export async function getNowPlayingData(): Promise<[]> {
    const data = await nowPlaying();
    return data.data.results;
}



//排行
export async function topData(): Promise<[]> {
    const data = await topRate();
    return data.data.results;
}

//电影语言分类
export async function originalData(language: string = 'zh'): Promise<[]> {
    const data = await original(language);
    return data.request
}

//电影语言
export async function getOriginData(): Promise<[]> {
    const date = getNow();
    const data = await original("zh", "release_date.desc", date);
    return data.data.results;
}
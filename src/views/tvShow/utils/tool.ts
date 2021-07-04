import { tvRate, airingToday, onTheAir, tvOriginal } from '@/netWork/tvShowRequest'
import { getTVPopular } from '@/netWork/homeRequeat'
import { Data } from '@/types/index'

//slide
export async function getSlide(): Promise<[]> {
    const page: number = Math.floor(Math.random() * 50 + 1);
    const data: Data = await tvRate(page);
    return data.data.results.slice(0, 6);
}

//今日播出
export async function todayData(page: number = 1): Promise<[]> {
    const data: Data = await airingToday();
    return data.data.results;
}

//即将播出
export async function ontheairData(page: number = 1): Promise<[]> {
    const data: Data = await onTheAir(page);
    return data.data.results;
}

//热门电视
export async function popularTv(page: number = 1): Promise<[]> {
    const data: Data = await getTVPopular(page);
    return data.data.results;
}

//电视排行
export async function topRate(page: number = 1): Promise<[]> {
    const data: Data = await tvRate(page);
    return data.data.results;
}

//国内热门
export async function cnPopular(): Promise<[]> {
    const data: Data = await tvOriginal();
    return data.data.results;
}
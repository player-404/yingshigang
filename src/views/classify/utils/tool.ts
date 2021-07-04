import { movieDisCover, search } from '@/netWork/classify'
interface Obj {
    data: any[],
    pages: number,
    currentPage: number
}
interface Data {
    [propName: string]: any
}
export async function discoverData(payload: Data): Promise<Obj> {
    const data: Data = await movieDisCover(payload.classify, payload.genres, payload.language, payload.year, payload.pages, payload.sort);
    return {
        data: data.data.results,
        pages: data.data.total_pages,
        currentPage: data.data.page
    }
}
//获取当前时间
export function nowTime(): Data {
    const date = new Date();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1) < 10 ? `0${(date.getMonth() + 1)}` : (date.getMonth() + 1);
    const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    return {
        fullTime: `${year}-${month}-${day}`,
        year: year
    };
}
//搜索
export async function searchData(keyword: string) {
    const data: any = await search(keyword);
}
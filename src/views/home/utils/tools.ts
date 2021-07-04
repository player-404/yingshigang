import { discoverMovie, discoverTvGenres } from '@/netWork/homeRequeat'

//电影数据
export async function getDiscover(genres?: string): Promise<[]> {
    const data: any = await discoverMovie(genres);
    return data.data.results;       
}

//电视数据
export async function getTvDiscover(genres?: string): Promise<[]> {
    const data: any = await discoverTvGenres(genres);
    return data.data.results;
}




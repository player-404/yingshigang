import { combinedCredits, coutMovie } from '@/netWork/actorRequest'
import { getInfo } from '@/netWork/actorRequest'
import { Obj } from '@/types/index'
//演员参与作品信息
export async function combinedCreditsData(personId: number): Promise<any[]> {
    const data = await combinedCredits(personId);
    const newData = data.data.results;
    return newData;
}
//演员信息
export async function getInfoData(personId: number): Promise<Obj> {
    const data = await getInfo(personId);
    return data.data
}

//演员知名作品
export async function countMovieData(personId: number): Promise<any[]> {
    const data = await coutMovie(personId);
    return data.data.results.slice(0, 8);
}
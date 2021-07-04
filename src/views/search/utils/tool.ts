import { search } from '@/netWork/classify'
import { movieSearch, PeopleSearch, tvSearch } from '@/netWork/searchRequest';
import { Obj, SearchDatas } from '@/types/index'
//综合搜索
export async function searchData(keyword: string): Promise<[]> {
    const data = await search(keyword);
    return data.data.results;
}

//电影搜索
export async function movieSearchData(keyword: string, page: number = 1): Promise<SearchDatas> {
    const data: Obj = await movieSearch(keyword, page);
    return {
        totleReslut: data.data.total_results,
        page: data.data.page,
        results: data.data.results,
        totalPage: data.data.total_pages
    };
}

//电视搜索
export async function tvSearchData(keyword: string, page: number = 1): Promise<SearchDatas> {
    const data: Obj = await tvSearch(keyword, page);
    return {
        totleReslut: data.data.total_results,
        page: data.data.page,
        results: data.data.results,
        totalPage: data.data.total_pages
    }
}

//演员搜索
export async function peopleSearchData(keyword: string, page: number = 1): Promise<SearchDatas> {
    const data: Obj = await PeopleSearch(keyword, page);
    return {
        totleReslut: data.data.total_results,
        page: data.data.page,
        results: data.data.results,
        totalPage: data.data.total_pages,
        personId: data.data.id
    }
}
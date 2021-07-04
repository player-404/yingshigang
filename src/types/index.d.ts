export interface Data {
    data: any
}
export interface Obj {
    [propName: string]: any
}
export interface Item {
    label: string,
    value: string,
    select?: boolean,
}
export interface classifyObj {
    classifySelect: string,
    classifyValue: string
}
//返回数据
export interface SearchDatas {
    totleReslut: number,
    page: number,
    results: any[],
    totalPage: number,
    personId?: number
}
export interface Stroage {
    username: string;
    password: string;
    userAvatar: string;
    info: string
  }
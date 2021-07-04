//dom操作都放在此文件
import { Pos, Ele } from './utils/interface'

export function getPos(ele: Ele): Pos {
    let x: number, y: number;
    x = ele.offsetLeft + (ele.offsetWidth / 2);
    y = ele.offsetTop + ele.offsetHeight;
    return {
        x, y
    }
}
export function getMPopular() {
    
}
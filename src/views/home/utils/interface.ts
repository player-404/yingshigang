export interface Pos {
    x: number,
    y: number
}
export interface Ele extends Element {
    offsetLeft: number,
    offsetTop: number,
    offsetWidth: number
    offsetHeight: number
}   
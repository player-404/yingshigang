import { topRate } from '@/netWork/movieRequest'
import { tvRate } from '@/netWork/tvShowRequest'
import { Obj, Data } from '@/types/index'
//今日推荐
export async function getDayRecommend(type: string): Promise<[Obj]> {
    const page = Math.floor(Math.random() * 5 + 1);
    if (type === 'movie') {
        const data: Data = await topRate(page);
        const index: number = Math.floor((Math.random() * data.data.results.length - 1) + 1)
        return data.data.results[index];
    }
    const data: Data = await tvRate(page);
    const index: number = Math.floor((Math.random() * data.data.results.length - 1) + 1)
    return data.data.results[index];
}

//文本溢出省略
export function ellipsis(textNum: number | string, overview: string): string {
    if (!overview) {
        return '暂无简介'
    }
    if (textNum === 'all') {
        return overview
    }
    if (overview.length > Number(textNum)) {
        const content = overview.slice(0, Number(textNum)).concat("...");
        return content;
    }
    return overview
}

//获取当前时间
export function getNow(): string {
    const sec = Date.now();
    const time = new Date(sec);
    const year = time.getFullYear();
    const month = (time.getMonth() + 1) < 10 ? `0${time.getMonth() + 1}` : time.getMonth() + 1;
    const day = time.getDate() < 10 ? `0${time.getDate()}` : time.getDate();
    const str = `${year}-${month}-${day}`
    return str;
}
//cookie
export const docCookies = {
    getItem: function (sKey: string) {
        return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[-.+*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
    },
    setItem: function (sKey: string, sValue: string, vEnd?: any, sPath?: string | number | Date, sDomain?: string, bSecure?: string) {
        if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) { return false; }
        var sExpires = "";
        if (vEnd) {
            switch (vEnd.constructor) {
                case Number:
                    sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + vEnd;
                    break;
                case String:
                    sExpires = "; expires=" + vEnd;
                    break;
                case Date:
                    sExpires = "; expires=" + vEnd.toUTCString();
                    break;
            }
        }
        document.cookie = encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
        return true;
    },
    removeItem: function (sKey: string, sPath: string, sDomain: string) {
        if (!sKey || !this.hasItem(sKey)) { return false; }
        document.cookie = encodeURIComponent(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "");
        return true;
    },
    hasItem: function (sKey: string) {
        return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[-.+*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
    },
    keys: /* optional method: you can safely remove it! */ function () {
        var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
        for (var nIdx = 0; nIdx < aKeys.length; nIdx++) { aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]); }
        return aKeys;
    }
};
import { Item } from '@/types/index'
import { nowTime } from './tool'
const date = nowTime();
//电影 or 电视
export const classify:any[] = [{
    label: '电影',
    value: 'movie',
},
{
    label: '电视剧',
    value: 'tv',
}]
//电影类别
export const movieGenres: any[] = [
    {
        label: '全部类型',
        value: 'all',
        select: false
    },
    {
        "value": 28,
        "label": "动作",
        select: false
    },
    {
        "value": 12,
        "label": "冒险",
        select: false
    },
    {
        "value": 16,
        "label": "动画",
        "select": false
    },
    {
        "value": 35,
        "label": "喜剧",
        "select": false
    },
    {
        "value": 80,
        "label": "犯罪",
        select: false
    },
    {
        "value": 99,
        "label": "纪录",
        select: false
    },
    {
        "value": 18,
        "label": "剧情",
        select: false
    },
    {
        "value": 10751,
        "label": "家庭",
        select: false
    },
    {
        "value": 14,
        "label": "奇幻",
        select: false
    },
    {
        "value": 36,
        "label": "历史",
        select: false
    },
    {
        "value": 27,
        "label": "恐怖",
        select: false
    },
    {
        "value": 10402,
        "label": "音乐",
        select: false
    },
    {
        "value": 9648,
        "label": "悬疑",
        select: false
    },
    {
        "value": 10749,
        "label": "爱情",
        select: false
    },
    {
        "value": 878,
        "label": "科幻",
        select: false
    },
    {
        "value": 10770,
        "label": "电视电影",
        select: false
    },
    {
        "value": 53,
        "label": "惊悚",
        select: false
    },
    {
        "value": 10752,
        "label": "战争",
        select: false
    },
    {
        "value": 37,
        "label": "西部",
        select: false
    }
]
//电视类别
export const tvGenres: any[] = [
    {
        "label": '全部类型',
        "value": 'all',
    },
    {
        "value": 10759,
        "label": "动作冒险"
    },
    {
        "value": 16,
        "label": "动画"
    },
    {
        "value": 35,
        "label": "喜剧"
    },
    {
        "value": 80,
        "label": "犯罪"
    },
    {
        "value": 99,
        "label": "纪录"
    },
    {
        "value": 18,
        "label": "剧情"
    },
    {
        "value": 10751,
        "label": "家庭"
    },
    {
        "value": 10762,
        "label": "儿童"
    },
    {
        "value": 9648,
        "label": "悬疑"
    },
    {
        "value": 10763,
        "label": "新闻"
    },
    {
        "value": 10764,
        "label": "真人秀"
    },
    {
        "value": 10765,
        "label": "Sci-Fi & Fantasy"
    },
    {
        "value": 10766,
        "label": "肥皂剧"
    },
    {
        "value": 10767,
        "label": "脱口秀"
    },
    {
        "value": 10768,
        "label": "War & Politics"
    },
    {
        "value": 37,
        "label": "西部"
    }
]
//语言
export const language: any[] = [
    {
        label: '全部语言',
        value: 'all',
        select: false
    },
    {
        label: '中文',
        value: 'zh'
    },
    {
        label: '英语',
        value: 'en'
    },
    {
        label: '日语',
        value: 'ja'
    },
    {
        label: '韩语&朝鲜语',
        value: 'ko'
    }, {
        label: '法语',
        value: 'fr'
    },
    {
        label: '德语',
        value: 'de'
    },
    {
        label: '意大利语',
        value: 'it'
    },
    {
        label: '西班牙语',
        value: 'es'
    },
    {
        label: '印地语',
        value: 'hi'
    },
    {
        label: '泰语',
        value: 'th'
    },
    {
        label: '俄语',
        value: 'ru'
    },
    {
        label: '波斯语',
        value: 'fa'
    },
    {
        label: '爱尔兰语',
        value: 'ga'
    },
    {
        label: '瑞典语',
        value: 'sv'
    },
    {
        label: '葡萄牙语',
        value: 'pt'
    },
    {
        label: '丹麦语',
        value: 'da'
    }
]
//年代
export const year: any[] = [
    {
        label: '全部年代',
        value: ''
    },
    {
        label: date.year,
        value: {
            max: date.fullTime,
            min: `${date.year}-01-01`
        }
    },
    {
        label: '2020',
        value: {
            max: '2020-12-31',
            min: '2020-01-01'
        }
    },
    {
        label: '2019',
        value: {
            max: '2019-12-31',
            min: '2019-01-01'
        }
    },
    {
        label: '2010年代',
        value: {
            max: '2019-12-31',
            min: '2010-01-01'
        }
    },
    {
        label: '2000年代',
        value: {
            max: '2009-12-31',
            min: '2000-01-01'
        }
    },
    {
        label: '90年代',
        value: {
            max: '1999-12-31',
            min: '1990-01-01'
        }
    },
    {
        label: '80年代',
        value: {
            max: '1989-12-31',
            min: '1980-01-01'
        }
    },
    {
        label: '70年代',
        value: {
            max: '1979-12-31',
            min: '1970-01-01'
        }
    },
    {
        label: '60年代',
        value: {
            max: '1969-12-31',
            min: '1960-01-01'
        }
    }
]

export const sort: any[] = [
    {
        label: '近期热门',
        value: 'popularity.desc'
    },
    {
        label: '标记最多',
        value: 'vote_count.desc'
    },
    {
        label: '评分最高',
        value: 'vote_average.desc'
    },
    {
        label: '最新上映',
        value: 'primary_release_date.desc'
    }
];
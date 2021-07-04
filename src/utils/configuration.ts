//预览封面
export const picPath: string = 'https://image.tmdb.org/t/p/w500';
//bg
export const bgPath: string = 'https://image.tmdb.org/t/p/w1920_and_h800_multi_faces'
//原图
export const heighPath: string = 'https://image.tmdb.org/t/p/original'
//电影类别
export const movieGenres: Array<any> = [
    {
        "id": 28,
        "name": "动作",
        select: false
    },
    {
        "id": 12,
        "name": "冒险",
        select: false
    },
    {
        "id": 16,
        "name": "动画",
        "select": false
    },
    {
        "id": 35,
        "name": "喜剧",
        "select": false
    },
    {
        "id": 80,
        "name": "犯罪",
        select: false
    },
    {
        "id": 99,
        "name": "纪录",
        select: false
    },
    {
        "id": 18,
        "name": "剧情",
        select: false
    },
    {
        "id": 10751,
        "name": "家庭",
        select: false
    },
    {
        "id": 14,
        "name": "奇幻",
        select: false
    },
    {
        "id": 36,
        "name": "历史",
        select: false
    },
    {
        "id": 27,
        "name": "恐怖",
        select: false
    },
    {
        "id": 10402,
        "name": "音乐",
        select: false
    },
    {
        "id": 9648,
        "name": "悬疑",
        select: false
    },
    {
        "id": 10749,
        "name": "爱情",
        select: false
    },
    {
        "id": 878,
        "name": "科幻",
        select: false
    },
    {
        "id": 10770,
        "name": "电视电影",
        select: false
    },
    {
        "id": 53,
        "name": "惊悚",
        select: false
    },
    {
        "id": 10752,
        "name": "战争",
        select: false
    },
    {
        "id": 37,
        "name": "西部",
        select: false
    }
]
//电视类别
export const tvGenres = [{
    "id": 10759,
    "name": "动作冒险"
},
{
    "id": 16,
    "name": "动画"
},
{
    "id": 35,
    "name": "喜剧"
},
{
    "id": 80,
    "name": "犯罪"
},
{
    "id": 99,
    "name": "纪录"
},
{
    "id": 18,
    "name": "剧情"
},
{
    "id": 10751,
    "name": "家庭"
},
{
    "id": 10762,
    "name": "儿童"
},
{
    "id": 9648,
    "name": "悬疑"
},
{
    "id": 10763,
    "name": "新闻"
},
{
    "id": 10764,
    "name": "真人秀"
},
{
    "id": 10765,
    "name": "Sci-Fi & Fantasy"
},
{
    "id": 10766,
    "name": "肥皂剧"
},
{
    "id": 10767,
    "name": "脱口秀"
},
{
    "id": 10768,
    "name": "War & Politics"
},
{
    "id": 37,
    "name": "西部"
}]

//限制名词
const certifications = [
    {
        "certification": "R",
        "meaning": "Under 17 requires accompanying parent or adult guardian 21 or older. The parent/guardian is required to stay with the child under 17 through the entire movie, even if the parent gives the child/teenager permission to see the film alone. These films may contain strong profanity, graphic sexuality, nudity, strong violence, horror, gore, and strong drug use. A movie rated R for profanity often has more severe or frequent language than the PG-13 rating would permit. An R-rated movie may have more blood, gore, drug use, nudity, or graphic sexuality than a PG-13 movie would admit.",
        "order": 4
    },
    {
        "certification": "PG",
        "meaning": "Some material may not be suitable for children under 10. These films may contain some mild language, crude/suggestive humor, scary moments and/or violence. No drug content is present. There are a few exceptions to this rule. A few racial insults may also be heard.",
        "order": 2
    },
    {
        "certification": "NC-17",
        "meaning": "These films contain excessive graphic violence, intense or explicit sex, depraved, abhorrent behavior, explicit drug abuse, strong language, explicit nudity, or any other elements which, at present, most parents would consider too strong and therefore off-limits for viewing by their children and teens. NC-17 does not necessarily mean obscene or pornographic in the oft-accepted or legal meaning of those words.",
        "order": 5
    },
    {
        "certification": "G",
        "meaning": "All ages admitted. There is no content that would be objectionable to most parents. This is one of only two ratings dating back to 1968 that still exists today.",
        "order": 1
    },
    {
        "certification": "NR",
        "meaning": "No rating information.",
        "order": 0
    },
    {
        "certification": "PG-13",
        "meaning": "Some material may be inappropriate for children under 13. Films given this rating may contain sexual content, brief or partial nudity, some strong language and innuendo, humor, mature themes, political themes, terror and/or intense action violence. However, bloodshed is rarely present. This is the minimum rating at which drug content is present.",
        "order": 3
    }
]
import $ from 'jquery'
import styles from './index.module.less'
import { getMovies } from '../../api/movie'
import { createMovieTags } from '../list'

let container

/**
 * 初始化分页
 */
function init() {
    container = $('<div>').addClass(styles.pager).appendTo('#app')
}

init()

/**
 * 创建分页
 * @param {*} page 页码
 * @param {*} limit 每页数量
 * @param {*} total 总数
 */
export function createPagers(page, limit, total) {
    container.empty();
    const pageNumber = Math.ceil(total / limit);
    const maxCount = 10 // 最多显示页码数量
    const minPager = Math.floor(page - maxCount/2) > 0 ? Math.floor(page - maxCount/2) : 1
    const maxPager = minPager + maxCount - 1 > pageNumber ? pageNumber : minPager + maxCount - 1
    
    /**
     * 
     * @param {*} text 标签文本
     * @param {*} status 标签状态
     * @param {*} targetPage 目标跳转页码
     */
    function createPagerTag(text, status, targetPage){
        const span = $("<span>").text(text).appendTo(container);
        const className = styles[status]
        span.addClass(className)

        if(status === ""){
            span.on('click', async function(){
                const newMovieData = await getMovies(targetPage, limit)
                createMovieTags(newMovieData.movieList)
                createPagers(targetPage, limit, newMovieData.movieTotal)
            })
        }
    }

    // 创建首页标签
    createPagerTag("|<<", page === 1 ? 'disabled' : "", 1)
    // 创建上一页标签
    createPagerTag("<<", page === 1 ? 'disabled' : "", page - 1 )
    // 创建数字页码标签
    for(let i = minPager; i <= maxPager; i++){
        createPagerTag(i, i === page ? 'active':"", i)
    }
    // 创建下一页标签
    createPagerTag(">>", page === pageNumber ? 'disabled' : "", page + 1 )
    // 创建尾页标签
    createPagerTag(">>|", page === pageNumber ? 'disabled' : "", pageNumber)
}
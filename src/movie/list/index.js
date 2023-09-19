import $ from 'jquery'
import styles from './index.module.less'

let container
/**
 * 初始化函数
 */
function init(){
    container = $('<div>').addClass(styles.container).appendTo("#app")
}

init()

/**
 * 根据传入的电影数据，创建元素并添加到容器中
 * @param movies 电影数组
 */
export function createMovieTags(movies) {
    for(const movie in movies){
        console.log('movie:', movie)
    }

    const result = movies.map(movie => {
       return `<div>
            <a href='${movie.url}' target="_blank">
                <img src="${movie.cover}" />
            </a>
            <a href='${movie.url}' target="_blank">
                <p class="${styles.title}">${movie.title}</p>
            </a>
            <p class="${styles.rate}">${movie.rate}</p>
        </div>`
    }).join("")

    container.html(result)
}
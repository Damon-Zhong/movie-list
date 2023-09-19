import { createMovieTags } from './list'
import { createPagers } from './pager'
import { getMovies } from '../api/movie'

async function init() {
    const movieData = await getMovies()

    createMovieTags(movieData.movieList)
    createPagers(1, 30, movieData.movieTotal)
}

init()
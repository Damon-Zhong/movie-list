import { createMovieTags} from './list'
import { getMovies } from '../api/movie'

async function init(){
    const movieData = await getMovies()

    createMovieTags(movieData)
}

init()
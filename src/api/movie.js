import axios from 'axios'

export async function getMovies(page = 1, limit = 10) {
   const { data } = await axios.get(`/api/movies`, {
    params: {
        page,
        size: limit
    }
   })

   console.log("get movies:", data)

   return data
}
// Server
import http from "./http-common"

class SearchService {
    search(city, genre) {
        return http.get(`/search/${city}/${genre}`)
    }
}

export default new SearchService()

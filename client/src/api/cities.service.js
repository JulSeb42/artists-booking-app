// Packages
import axios from "axios"

const citiesService = () => {
    return axios
        .get(
            "https://raw.githubusercontent.com/JulSeb42/js-utils/master/src/allCities.json"
        )
        .then(res => {
            return res.data
                .filter(city => city.country === "Germany")
                .map(city => city.name)
                .sort()
        })
        .catch(err => console.log(err))
}

export default citiesService

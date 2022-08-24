import axios from "axios"

const DelMovie = (id) => {
    return new Promise((resolve, reject) => {
        axios.delete('http://localhost:8000/api/movies/delete/movies/' + id).then((data) => {
            resolve(data)
        }).catch((err) => {
            reject(err)
        })
    })

}
export default DelMovie
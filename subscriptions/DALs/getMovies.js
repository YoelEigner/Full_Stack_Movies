const axios = require('axios')
const mongoMembersDB = require('../configs/membersDBSchema')
const mongoMoviesDB = require('../configs/moviesSchema')

exports.saveUsers = async () =>{
    // let resp = await axios.get('https://jsonplaceholder.typicode.com/users')
    // let saveToDB = await mongoMembersDB.create(resp.data)
}
exports.saveMovies = async () =>{
    // let resp = await axios.get('https://api.tvmaze.com/shows')
    // let saveToDB = await mongoMoviesDB.create(resp.data)
}


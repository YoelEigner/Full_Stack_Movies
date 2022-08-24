import axios from "axios"

const DelMembers = async (id) =>{
    let resp = await axios.delete('http://localhost:8000/api/members/delete/members/' + id)
    let respSubs = await axios.delete('http://localhost:8000/api/subs/delete/subs/' + id)
    return {resp, respSubs}
}
export default DelMembers
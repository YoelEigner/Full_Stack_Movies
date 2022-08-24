import axios from "axios";

const Users = async ()=> {
  let finalUsers = [];
  let respUsers = await axios.get("http://localhost:8001/api/users");
  let respPermissions = await axios.get("http://localhost:8001/api/users/permissions");
  let respUserName = await axios.get("http://localhost:8001/api/users/db");

  respUsers.data.forEach((user) => {
    let permissions = respPermissions.data.find((x) => x.id === user.id);    
    let username = respUserName.data.find((x) => x._id === user.id);    
    let userIndex = respUsers.data.findIndex((x) => x.id === permissions.id);
    finalUsers.push(user);
    finalUsers[userIndex].permissions = [permissions.permissions]
    finalUsers[userIndex].username = [username.username]
    return finalUsers;
  });
  return respUsers;
};
export default Users;

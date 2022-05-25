const editUser = `
mutation editUser($id: ID!, $login: String, $role: String){
    editUser(id: $id, login: $login, role: $role){
      _id
      login
      reg
      roles
      email
      server
      ua
      gameInfo{
        gameNickName
        adventureLvl
        mainChar
      }
    }
  }
`;

export default editUser;
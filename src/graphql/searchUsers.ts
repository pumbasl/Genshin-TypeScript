const searchUsers = `
query SearchUsers($name: String!){
    searchUsersByName(name: $name){
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

export default searchUsers;
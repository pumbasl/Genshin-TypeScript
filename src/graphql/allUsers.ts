const allUsers = `
query AllUsers{
    regUsers{
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

export default allUsers;
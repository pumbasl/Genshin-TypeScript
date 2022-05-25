const changeServer = `
mutation changeServer($server: String!){
    editRegUserServer(server: $server){
      _id
      login
      reg
      roles
      tokenVersion
      email
      server
    }
}`;

export default changeServer;
const getRegisterUserData = `
query GetPromoCodesAndUserCodesAndWebEvents($server: String!){
  promosByServer(server: $server){
    _id
    code
    server
    expired
    created
  }
  
  getRegUserPromo{
    promos{
      _id
      code
      server
      expired
      created
    }
  }
  
  subfields{
    _id
    name
    link
    expired
  }
}`;

export default getRegisterUserData;
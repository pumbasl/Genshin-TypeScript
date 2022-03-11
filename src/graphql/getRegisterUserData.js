const getRegisterUserData = `
query GetPromoCodesAndUserCodesAndWebEvents($server: String!){
  promosByServer(server: $server){
    _id
    code
    server
    expired
  }
  
  getRegUserPromo{
    promos{
      _id
      code
      server
      expired
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
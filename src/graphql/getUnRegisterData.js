const getUnRegisterData = `
query GetPromoCodesAndWebEvents($server: String!){
  promosByServer(server: $server){
    _id
    code
    server
    expired
    created
  }
  
  subfields{
    _id
    name
    link
    expired
    created
  }
}`;

export default getUnRegisterData;
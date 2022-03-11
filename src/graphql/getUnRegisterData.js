const getUnRegisterData = `
query GetPromoCodesAndWebEvents($server: String!){
  promosByServer(server: $server){
    _id
    code
    server
    expired
  }
  
  subfields{
    _id
    name
    link
    expired
  }
}`;

export default getUnRegisterData;
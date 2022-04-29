const addPromoCode = `
mutation AddPromo($code: String!, $server: String!, $expired: String!){
    addPromo(code: $code, server: $server, expired: $expired){
      code
      server
      expired
    }
}`;

export default addPromoCode;
const newUserPromo = `
mutation clickPromo($promos: [String!]){
  editRegUserPromos(promos: $promos){
    promos{
      _id
      code
      server
      expired
    }
  }
}`;

export default newUserPromo;
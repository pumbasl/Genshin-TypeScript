const addWebEvent = `
mutation AddWebEvent($name: String!, $link: String!, $expired: Float!){
  addSubfields(name: $name, link: $link, expired: $expired){
    _id
    name
    link
    expired
  }
}`;

export default addWebEvent;
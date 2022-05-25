const setAvatar = `
mutation SetAvatar($url: String!, $ref: String!){
  setAvatar(url: $url, ref: $ref){
    urlPath
    ref
  }
}`;

export default setAvatar;
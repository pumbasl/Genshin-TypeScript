const registration = `
mutation Registration($login: String!, $password: String!, $re_password: String!, $ua: String!){
    registration(login: $login, password: $password, re_password: $re_password, ua: $ua){
        accessToken
    }
}
`;

export default registration;
const registration = `
mutation Registration($login: String!, $password: String!, $re_password: String! $server: String!, $ua: String!){
    registration(login: $login, password: $password, re_password: $re_password, server: $server, ua: $ua){
        accessToken
    }
}
`;

export default registration;
const login = `
mutation Login($login: String!, $password: String!){
    login(login: $login, password: $password){
        accessToken
    }
}
`;

export default login;
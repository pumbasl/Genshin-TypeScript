const regUser = `
query regUser{
    regUser{
        _id
        login
        reg
        roles
        email
        avatar{
            urlPath
            ref
        }
        server
        ua
        gameInfo{
            gameNickName
            adventureLvl
            mainChar
        }
    }
}
`;

export default regUser;
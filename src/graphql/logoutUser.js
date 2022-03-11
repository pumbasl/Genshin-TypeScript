const logoutUser = `
mutation RestoreLogin($id: ID!){
    revokeRefreshTokensForRegUser(id: $id)
}`;

export default logoutUser;
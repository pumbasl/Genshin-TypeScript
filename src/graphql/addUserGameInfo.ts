const UserGameInfo = `
mutation AddGameInfo($gameNickName: String, $adventureLvl: Int, $mainChar: String){
    addGameInfo(gameNickName: $gameNickName, adventureLvl: $adventureLvl, mainChar: $mainChar){
        ownerId
        gameNickName
        adventureLvl
        mainChar
    }
}
`;

export default UserGameInfo;
import { getStorage } from "../storage"
import { PlayerState } from "./playerSlice";

export interface SaveGameInfo {
    id: string
    playerName: string
}

export const SaveGameService = {
    listSaveGames: async (): Promise<SaveGameInfo[]> => {
        const storage = await getStorage();
        const keys = await storage.keys();

        const gameKeys = keys.filter(k => k.startsWith('game_'))

        const saveGames: SaveGameInfo[] = [];
        for (const i in gameKeys) {
            const key: string = gameKeys[i]
            const json: string = await storage.get(key);
            const game: PlayerState = JSON.parse(json);

            saveGames.push({
                id: game.id,
                playerName: game.name
            })
        }

        return saveGames;
    }
}
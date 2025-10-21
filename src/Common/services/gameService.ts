import axios from "axios";
import { CreateGameRequest, GameType, InteractiveGameResponse } from "../constants/types";
import { err, ok, Result } from "../utils/result";
import { getHeaders } from "./utils";

export class GameService {
    #urlBase: string;

    constructor(urlBase: string) {
        this.#urlBase = urlBase;
    }


    async createInteractiveGame(guest_id: string, token: string | null, type: GameType, request: CreateGameRequest): Promise<Result<InteractiveGameResponse>> {
        try {
            const response = await axios.post(`${this.#urlBase}/game/general/${type}/create`, request, {
                headers: getHeaders(guest_id, token)
            });

            let result: InteractiveGameResponse = response.data;
            return ok(result)
        } catch (error) {
            console.error("createInteractiveGame:", error)
            return err("Klarte ikke opprette spill");
        }
    }
}
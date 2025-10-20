import { err } from "../utils/result";

export class GameService {
    #urlBase: string;

    constructor(urlBase: string) {
        this.#urlBase = urlBase;
    }

    createInteractiveGame() {
        //
    }

    createStandaloneGame(): Promise<Result<>> {
        try {

        } catch (error) {
            console.error("createStandaloneGame:", error)
            return err("Klarte ikke opprette spill");
        }
    }
}
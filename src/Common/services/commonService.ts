import axios from "axios";
import { err, ok, Result } from "../utils/result";
import { SystemHealth } from "../constants/types";

export class CommonService {
    #urlBase: string;

    constructor(urlBase: string) {
        this.#urlBase = urlBase;
    }

    async health(): Promise<Result<string>> {
        try {
            const url = `${this.#urlBase}/health`
            const response = await axios.get(url);
            console.log(response.data)
            if (response.data !== "OK") {
                console.error("Server is down");
                return err("Server er nede, prøv igjen senere");
            }
            return ok(response.data)
        } catch (error) {
            console.error("health:", error);
            return err("health check failed");
        }
    }

    async healthDetailed(): Promise<Result<SystemHealth>> {
        try {
            const url = `${this.#urlBase}/health/detailed`
            const response = await axios.get(url);
            return ok(response.data)
        } catch (error) {
            return err("health detailed check failed");
        }
    }
}
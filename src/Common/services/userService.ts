import { err, ok, Result } from "../utils/result";
import axios from 'axios';

import { User } from "../constants/types";
import { getHeaders } from "./utils";

export class UserService {

    #baseUrl: string;

    constructor(baseUrl: string) {
        this.#baseUrl = baseUrl;
    }

    getProfilePicture(guest_id: string, username?: string): string {
        if (!username) {
            username = guest_id
        }

        const avatar = `https://api.dicebear.com/9.x/pixel-art/png?seed=${username}`;
        console.log(avatar);
        return avatar;
    }

    async ensurePseudoId(): Promise<Result<string>> {
        try {
            let url = `${this.#baseUrl}/guest/ensure`;
            let response = await axios.post<string>(url);
            return ok(response.data)
        } catch (error) {
            console.error("ensureGuestId:", error);
            return err("Klarte ikke å hente gjeste id");
        }
    }

    async getUserData(token: string): Promise<Result<User>> {
        try {
            let url = `${this.#baseUrl}/user`;
            let response = await axios.get<User>(url, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })

            return ok(response.data);
        } catch (error) {
            console.error("getUserData:", error);
            return err("Klarte ikke hente brukerdata");
        }
    }

    // TODO
    async patchUserData(token: string, request: string): Promise<Result<void>> {
        try {
            let url = `${this.#baseUrl}/user`;
            let response = axios.patch(url, request, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            if ((await response).status! = 200) {
                // TODO AUDIT LOG
                console.error("Failed to update userdata");
            }

            return ok();
        } catch (error) {
            console.log("patchUserData:", error);
            return err("Klarte ikke oppdatere bruker aktivitet");
        }
    }

    async patchUserActivity(guest_id: string): Promise<Result<void>> {
        try {
            let url = `${this.#baseUrl}/user/activity`;
            let response = axios.patch(url, {
                headers: getHeaders(guest_id, null)
            });
            if ((await response).status! = 200) {
                // TODO AUDIT LOG
                console.error("Failed to update user activity");
            }

            return ok();
        } catch (error) {
            console.log("patchUserActivity:", error);
            return err("Klarte ikke oppdatere bruker aktivitet");
        }
    }

    async deleteUser(token: string, user_id: string): Promise<Result<void>> {
        try {
            let url = `${this.#baseUrl}/user/delete?user_id=${user_id}`;
            let response = await axios.delete(url, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            if (response.status != 200) {
                return err("Klarte ikke slette bruker");
            }

            return ok();
        } catch (error) {
            console.log("deleteUser:", error);
            return err("Klarte ikke slette bruker");
        }
    }

    async listUsers(token: string): Promise<Result<User[]>> {
        try {
            let url = `${this.#baseUrl}/user/list`
            let response = await axios.get<User[]>(url, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            return ok(response.data);
        } catch (error) {
            console.log("listUsers:", error);
            return err("Klarte ikke liste ut brukere");
        }
    }

    async validateToken(token: string): Promise<Result<boolean>> {
        try {
            let response = await fetch(`${this.#baseUrl}/valid-token`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (response.status === 200) {
                return ok(true);
            }

            if (response.status === 401 || response.status === 403) {
                return ok(false);
            }

            return err("Invalid token");
        } catch (error) {
            console.log("validateToken:", error);
            return err("Klarte ikke validere token");
        }
    }

    async getActivityStats(token: string): Promise<Result<void>> {
        try {
            await axios.get(`${this.#baseUrl}/stats`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            return ok(undefined);
        } catch (error) {
            console.log("getActivityStats:", error);
            return err("Klarte ikke hente aktivitetstats");
        }
    }

    async getConfig(token: string): Promise<Result<void>> {
        try {
            await axios.get(`${this.#baseUrl}/config`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            return ok(undefined);
        } catch (error) {
            console.log("getConfig:", error);
            return err("Klarte ikke hente config");
        }
    }

    async updateGlobalPopup(token: string, popup: any): Promise<Result<void>> {
        try {
            await axios.put(`${this.#baseUrl}/popup`, popup, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            return ok(undefined);
        } catch (error) {
            console.log("updateGlobalPopup:", error);
            return err("Klarte ikke oppdatere popup");
        }
    }

}
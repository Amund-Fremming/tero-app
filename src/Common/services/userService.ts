import { err, ok, Result } from "../utils/result";
import axios from 'axios';

import { ActivityStats, BaseUser, ClientPopup, PatchUserRequest, UserWithRole } from "../constants/types";
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

    async ensurePseudoId(pseudo_id: string | null): Promise<Result<string>> {
        try {
            let url: string;
            if (pseudo_id) {
                url = `${this.#baseUrl}/pseudo/ensure?pseudo_id=${pseudo_id}`;
            } else {
                url = `${this.#baseUrl}/pseudo/ensure`;
            }

            const response = await axios.post<string>(url);
            return ok(response.data)
        } catch (error) {
            console.error("ensurePseudoId:", error);
            return err("Klarte ikke å hente gjeste id");
        }
    }

    async getUser(token: string): Promise<Result<UserWithRole>> {
        try {
            let url = `${this.#baseUrl}/user`;
            let response = await axios.get<UserWithRole>(url, {
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

    async patchUser(token: string, user_id: string, request: PatchUserRequest): Promise<Result<BaseUser>> {
        try {
            const url = `${this.#baseUrl}/user/${user_id}`;
            const response = await axios.patch<BaseUser>(url, request, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })

            return ok(response.data);
        } catch (error) {
            console.error("patchUser:", error);
            return err("Klarte ikke oppdatere bruker");
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

    async listUsers(token: string): Promise<Result<BaseUser[]>> {
        try {
            let url = `${this.#baseUrl}/user/list`
            let response = await axios.get<BaseUser[]>(url, {
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

    async getConfig(token: string): Promise<Result<void>> {
        try {
            await axios.get(`${this.#baseUrl}/config`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            return ok();
        } catch (error) {
            console.log("getConfig:", error);
            return err("Klarte ikke hente config");
        }
    }

    async getGlobalPopup(): Promise<Result<ClientPopup>> {
        try {
            const url = `${this.#baseUrl}/pseudo/popup`;
            const response = await axios.get<ClientPopup>(url);
            console.log(response.data);
            return ok(response.data)
        } catch (error) {
            console.error("getGlobalPopup:", error);
            return err("Failed to get client popup")
        }
    }

    async updateGlobalPopup(token: string, popup: ClientPopup): Promise<Result<void>> {
        try {
            await axios.put(`${this.#baseUrl}/popup`, popup, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            return ok();
        } catch (error) {
            console.log("updateGlobalPopup:", error);
            return err("Klarte ikke oppdatere popup");
        }
    }

    async getUserStats(token: string): Promise<Result<ActivityStats>> {
        try {
            const url = `${this.#baseUrl}/user/stats`;
            const response = await axios.get<ActivityStats>(url, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (response.status !== 200) {
                return err("Response was not 200");
            }

            return ok(response.data)
        } catch (error) {
            console.error("getUserStats:", error);
            return err("Failed to get user stats")
        }
    }
}
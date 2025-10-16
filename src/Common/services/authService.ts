import { err, ok, Result } from "../utils/result";
import axios from 'axios';

import { PLATFORM_URL_BASE } from "../constants/endpoints";
import { User } from "../constants/types";

export class AuthService {

    async ensureGuestId(): Promise<Result<string>> {
        try {
            let url = `${PLATFORM_URL_BASE}/guest/ensure`;
            let response = await axios.post<string>(url);
            return ok(response.data)
        } catch (error) {
            console.error("ensureGuestId:", error);
            return err("Klarte ikke å hente gjeste id");
        }
    }

    async getUserData(guest_id: string, token: string | null): Promise<Result<User>> {
        try {
            if (token) {
                let url = `${PLATFORM_URL_BASE}/user`;
                let response = await axios.get<User>(url, {
                    headers: {
                        "X-Guest-Authentication": guest_id,
                        Authorization: `Bearer ${token}`,
                    },
                })

                return ok(response.data);
            }
            let url = `${PLATFORM_URL_BASE}/user`;
            let response = await axios.get<User>(url, {
                headers: {
                    "X-Guest-Authentication": guest_id
                },
            })

            return ok(response.data);
        } catch (error) {
            console.error("getUserData:", error);
            return err("Klarte ikke hente brukerdata");
        }
    }
}
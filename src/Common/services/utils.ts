export function getHeaders(guest_id: string, token: string | null): Record<string, string> {
    const headers: Record<string, string> = {
        "X-Guest-Authentication": guest_id,
    };

    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    return headers;
}

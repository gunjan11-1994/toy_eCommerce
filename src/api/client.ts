// src/api/client.ts
import axios from 'axios';

const TOKEN_KEY = 'toystore.token';

export const tokenStorage = {
    get: () => localStorage.getItem(TOKEN_KEY),
    set: (token: string) => localStorage.setItem(TOKEN_KEY, token),
    clear: () => localStorage.removeItem(TOKEN_KEY),
};

/** Milliseconds until the token's `exp` claim runs out; 0 if missing, unreadable or past.
*  The payload is only base64 — readable without the secret. The browser cannot
*  check the signature, so this is a convenience; the server still has the final say. */
export function msUntilExpiry(token: string | null): number {
    if (!token) return 0;
    try {
        const payload = JSON.parse(atob(token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')));
        return Math.max(0, payload.exp * 1000 - Date.now());
    } catch {
        return 0;
    }
}

// Every call in the app goes through this instance. "/api" is proxied to the
// JWT server by vite.config.js.
export const api = axios.create({ baseURL: '/api' });

// Request interceptor: attach the token to every outgoing call.
api.interceptors.request.use((config) => {
    const token = tokenStorage.get();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

// Response interceptor: a 401 while we hold a token means the server rejected
// it (expired or tampered), so log out. AuthProvider supplies the handler.
let onUnauthorized = () => { };

export function setUnauthorizedHandler(handler: () => void) {
    onUnauthorized = handler;
}

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (axios.isAxiosError(error) && error.response?.status === 401 && tokenStorage.get()) {
            onUnauthorized();
        }
        return Promise.reject(error);
    },
);

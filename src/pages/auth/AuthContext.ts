// src/features/auth/AuthContext.ts
import { createContext } from 'react';

export interface User {
    id: number;
    name: string;
    username: string;
}

export interface AuthValue {
    user: User | null;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
}

export const AuthContext = createContext<AuthValue | null>(null);


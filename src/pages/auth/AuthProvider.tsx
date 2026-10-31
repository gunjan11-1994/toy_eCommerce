// src/features/auth/AuthProvider.tsx
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  api,
  msUntilExpiry,
  setUnauthorizedHandler,
  tokenStorage,
} from "../../api/client";
import { AuthContext, type User } from "./AuthContext";
import { useDispatch } from "react-redux";
import {
  login as reduxLogin,
  logout as reduxLogout,
} from "../../Redux/authSlice";

const USER_KEY = "toystore.user";

// After a reload, trust the saved user only if the token is there and not expired.
function readSavedUser(): User | null {
  const raw = localStorage.getItem(USER_KEY);
  return raw && msUntilExpiry(tokenStorage.get()) > 0 ? JSON.parse(raw) : null;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const dispatch = useDispatch();
  const [user, setUser] = useState<User | null>(readSavedUser);

  const login = useCallback(
    async (username: string, password: string) => {
      const { data } = await api.post<{
        token: string;
        user: User & { id: number };
      }>("/login", {
        username,
        password,
      });

      tokenStorage.set(data.token);

      localStorage.setItem(USER_KEY, JSON.stringify(data.user));

      setUser(data.user);

      // Update Redux authentication
      dispatch(
        reduxLogin({
          userId: String(data.user.id),
          username: data.user.name,
        }),
      );
    },
    [dispatch],
  );

  const logout = useCallback(() => {
    tokenStorage.clear();
    localStorage.removeItem(USER_KEY);

    setUser(null);

    // Clear Redux authentication
    dispatch(reduxLogout());
  }, [dispatch]);

  // When the server rejects our token, the axios interceptor calls logout.
  useEffect(() => {
    setUnauthorizedHandler(logout);
  }, [logout]);

  // Log out the moment the token expires, even if the tab just sits open.
  useEffect(() => {
    if (!user) return;
    const timer = setTimeout(logout, msUntilExpiry(tokenStorage.get()));
    return () => clearTimeout(timer);
  }, [user, logout]);

  const value = useMemo(() => ({ user, login, logout }), [user, login, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

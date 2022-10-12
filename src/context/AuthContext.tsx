import Router from "next/router";
import { ReactNode, createContext, useState, useEffect } from "react";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { api } from "../services/apiClient";
import { RotasEnum } from "../shared/utils/rotas";

type User = {
  id?: string;
  name?: string;
  userName?: string;
  email: string;
  createdAt?: Date;
};

type SignInCredentials = {
  email: string;
  senha: string;
};

type AuthContextData = {
  signIn(credentials: SignInCredentials): Promise<void>;
  isAuthenticated: boolean;
  user: User;
};

type AuthProviderProps = {
  children: ReactNode;
};

export function signOut() {
  destroyCookie(undefined, "nextauth.token");
  destroyCookie(undefined, "nextauth.refreshToken");

  typeof window !== "undefined" && Router.push(RotasEnum.LOGIN);
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>(null);
  const isAuthenticated = !!user;

  useEffect(() => {
    const { "nextauth.token": token } = parseCookies();

    if (token) {
      api
        .get("/users/me")
        .then((response) => {
          const { id, name, userName, email, createdAt } = response?.data;
          setUser({ id, name, userName, email, createdAt });
        })
        .catch(() => {
          signOut();
        });
    }
  }, []);

  async function signIn({ email, senha }) {
    try {
      const response = await api.post("/auth", {
        email,
        password: senha,
      });

      const { token, refreshToken } = response.data;

      setCookie(undefined, "nextauth.token", token, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: "/",
      });
      setCookie(undefined, "nextauth.refreshToken", refreshToken, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: "/",
      });

      setUser({
        email,
      });

      api.defaults.headers["Authorization"] = `Bearer ${token}`;

      Router.push(RotasEnum.INICIO);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <AuthContext.Provider value={{ signIn, isAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  );
}

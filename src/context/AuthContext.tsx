import Router from "next/router";
import React, { ReactNode, createContext, useState, useEffect } from "react";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { api } from "../services/apiClient";
import { RotasEnum } from "../shared/utils/rotas";
import { Snackbar, Alert, AlertProps } from "@mui/material";

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
  signOut(): void;
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

  const [alert, setAlert] = useState<{
    open: boolean;
    mensagem: string;
    severity: AlertProps["severity"];
  }>({ open: false, mensagem: "", severity: "success" });

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
      setAlert({
        open: true,
        mensagem:
          error.response.data.message ||
          "Erro ao realizar login, tente novamente mais tarde",
        severity: "error",
      });
    }
  }

  function signOut() {
    destroyCookie(undefined, "nextauth.token");
    destroyCookie(undefined, "nextauth.refreshToken");
    setUser(null);

    typeof window !== "undefined" && Router.push(RotasEnum.LOGIN);
  }

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setAlert({ open: false, mensagem: "", severity: "success" });
  };

  return (
    <AuthContext.Provider value={{ signIn, signOut, isAuthenticated, user }}>
      <Snackbar
        open={alert.open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ horizontal: "right", vertical: "top" }}
      >
        <Alert
          severity={alert.severity}
          sx={{ width: "100%" }}
          onClose={handleClose}
        >
          {alert.mensagem}
        </Alert>
      </Snackbar>
      {children}
    </AuthContext.Provider>
  );
}

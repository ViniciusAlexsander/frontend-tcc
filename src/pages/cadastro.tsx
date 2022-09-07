import React, { useState, FormEvent } from "react";
import {
  Box,
  Button,
  TextField,
  Grid,
  Typography,
  Link,
  Snackbar,
  Alert,
  AlertProps,
} from "@mui/material";

import { api } from "../services/api";
import Router from "next/router";
import { RotasEnum } from "../shared/utils/rotas";

export default function Cadastro() {
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = React.useState<{
    open: boolean;
    mensagem: string;
    severity: AlertProps["severity"];
  }>({ open: false, mensagem: "", severity: "success" });

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    try {
      const response = await api.post("/users", {
        email,
        password,
        name,
        userName,
      });

      setAlert({
        open: true,
        mensagem: "Usuário criado com sucesso",
        severity: "success",
      });

      Router.push("/login");
    } catch (error) {
      setAlert({
        open: true,
        mensagem: error.response.data.message || "Erro ao criar usuário",
        severity: "error",
      });
    }
  }

  const handleClose = () => {
    Router.push("/");
  };

  return (
    <>
      <Snackbar
        open={alert.open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ horizontal: "right", vertical: "top" }}
      >
        <Alert
          onClose={handleClose}
          severity={alert.severity}
          sx={{ width: "100%" }}
        >
          {alert.mensagem}
        </Alert>
      </Snackbar>
      <Box
        component="form"
        onSubmit={handleSubmit}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="90vh"
      >
        <Grid container spacing={2} sx={{ maxWidth: "300px" }}>
          <Grid item xs={12}>
            <Typography variant="h3">Cadastre-se</Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              label="Digite seu nome completo"
              type="text"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              label="Digite um username"
              type="text"
              fullWidth
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              label="Digite seu e-mail"
              type="email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              label="Digite sua senha"
              type="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              disabled={!password || !email || !name || !userName}
            >
              Entrar
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2">
              Ja tem conta? <Link href={RotasEnum.LOGIN}>Fazer login</Link>
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

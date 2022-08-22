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

import { AuthContext } from "../context/AuthContext";
import { api } from "../services/api";
import Router from "next/router";

export default function Cadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [alert, setAlert] = React.useState<{
    open: boolean;
    mensagem: string;
    severity: AlertProps["severity"];
  }>({ open: false, mensagem: "", severity: "success" });

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    try {
      const response = await api.post("/usuarios", {
        email,
        senha,
        nome,
      });

      setAlert({
        open: true,
        mensagem: "Usuário criado com sucesso",
        severity: "success",
      });
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
        height="100vh"
        width="100vw"
      >
        <Grid container spacing={2} xs={10} sm={5} md={4} lg={3}>
          <Grid item xs={12}>
            <Typography variant="h3">Cadastre-se</Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              label="Digite seu nome completo"
              type="text"
              fullWidth
              value={nome}
              onChange={(e) => setNome(e.target.value)}
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
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              disabled={!senha || !email}
            >
              Entrar
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2">
              Ja tem conta? <Link href="/">Fazer login</Link>
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

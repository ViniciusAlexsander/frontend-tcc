import React, { useState, FormEvent } from "react";
import {
  Box,
  TextField,
  Grid,
  Typography,
  Link,
  Snackbar,
  Alert,
  AlertProps,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { SaveAs } from "@mui/icons-material";
import { api } from "../services/apiClient";
import Router from "next/router";
import { RotasEnum } from "../shared/utils/rotas";

export default function Cadastro() {
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loadingButton, setLoadingButton] = useState(false);
  const [alert, setAlert] = useState<{
    open: boolean;
    mensagem: string;
    severity: AlertProps["severity"];
  }>({ open: false, mensagem: "", severity: "success" });

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    try {
      setLoadingButton(true);
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
    } finally {
      setLoadingButton(false);
    }
  }

  return (
    <>
      <Snackbar
        open={alert.open}
        autoHideDuration={6000}
        anchorOrigin={{ horizontal: "right", vertical: "top" }}
      >
        <Alert severity={alert.severity} sx={{ width: "100%" }}>
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
        <Grid
          container
          gap={2}
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          width={{ xs: "50vw", md: "30vw" }}
        >
          <Typography variant="h4" fontWeight={700} mb={2}>
            CADASTRE-SE
          </Typography>

          <TextField
            variant="outlined"
            label="Digite seu nome completo"
            type="text"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <TextField
            variant="outlined"
            label="Digite um username"
            type="text"
            fullWidth
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />

          <TextField
            variant="outlined"
            label="Digite seu e-mail"
            type="email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            variant="outlined"
            label="Digite sua senha"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <LoadingButton
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            disabled={!password || !email || !name || !userName}
            loading={loadingButton}
            loadingPosition="start"
            startIcon={<SaveAs />}
          >
            Cadastrar
          </LoadingButton>

          <Typography variant="body2">
            Já possui uma conta? <Link href={RotasEnum.LOGIN}>Fazer login</Link>
          </Typography>
        </Grid>
      </Box>
    </>
  );
}

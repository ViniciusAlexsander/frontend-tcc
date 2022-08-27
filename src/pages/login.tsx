import { FormEvent, useContext, useState } from "react";
import Image from "next/image";
import { AuthContext } from "../context/AuthContext";
import { Box, Button, TextField, Grid, Typography, Link } from "@mui/material";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const { signIn } = useContext(AuthContext);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const data = {
      email,
      senha,
    };

    await signIn(data);
  }

  return (
    <Grid
      container
      xs={12}
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <Grid
        container
        item
        display={{ xs: "none", sm: "flex" }}
        sm={7}
        md={6}
        lg={5}
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Image
          width={500}
          height={592}
          src="/imgLogin.svg"
          objectFit="cover"
          alt="Imagem de duas pessoas sentadas no sofá vendo um filme"
        />
      </Grid>
      <Grid
        container
        item
        spacing={2}
        xs={10}
        sm={5}
        md={4}
        lg={3}
        component="form"
        onSubmit={handleSubmit}
        sx={{ height: "50%" }}
      >
        <Grid item xs={12}>
          <Typography variant="h3">Login</Typography>
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
            Clique aqui e <Link href="/cadastro">cadastre-se</Link>
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}

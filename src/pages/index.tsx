import { FormEvent, useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Box, Button, TextField, Grid, Typography, Link } from "@mui/material";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signIn, isAuthenticated } = useContext(AuthContext);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const data = {
      email,
      password,
    };

    await signIn(data);
  }

  return (
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
            disabled={!password || !email}
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
    </Box>
  );
}

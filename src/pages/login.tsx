import { FormEvent, useContext, useState } from "react";
import Image from "next/image";
import { AuthContext } from "../context/AuthContext";
import { Button, TextField, Grid, Typography, Link } from "@mui/material";
import { RotasEnum } from "../shared/utils/rotas";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import { withSSRGuest } from "../shared/utils/withSSRGuest";

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
      spacing={8}
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <Grid
        container
        item
        display={{ xs: "none", sm: "flex" }}
        sm={5}
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
        xs={10}
        sm={5}
        md={5}
        lg={4}
        xl={3}
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
            Clique aqui e <Link href={RotasEnum.CADASTRO}>cadastre-se</Link>
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}

export const getServerSideProps = withSSRGuest(async () => {
  return {
    props: {},
  };
});

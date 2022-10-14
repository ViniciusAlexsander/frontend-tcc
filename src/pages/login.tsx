import { FormEvent, useContext, useState } from "react";
import Image from "next/image";
import { AuthContext } from "../context/AuthContext";
import { TextField, Grid, Typography, Link } from "@mui/material";
import { Login as LoginIcon } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { RotasEnum } from "../shared/utils/rotas";
import { withSSRGuest } from "../shared/utils/withSSRGuest";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loadingButton, setLoadingButton] = useState(false);

  const { signIn } = useContext(AuthContext);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setLoadingButton(true);

    const data = {
      email,
      senha,
    };

    await signIn(data);
    setLoadingButton(false);
  }

  return (
    <Grid
      container
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
          <Typography variant="h4" fontWeight={700}>
            LOGIN
          </Typography>
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
          <LoadingButton
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            disabled={!senha || !email}
            loading={loadingButton}
            loadingPosition="start"
            startIcon={<LoginIcon />}
          >
            Entrar
          </LoadingButton>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body2">
            Não possui conta?{" "}
            <Link href={RotasEnum.CADASTRO}>Clique aqui e cadastre-se.</Link>
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

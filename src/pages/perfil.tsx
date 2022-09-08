import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import { RotasEnum } from "../shared/utils/rotas";

export default function Perfil() {
  return <h1>Perfil</h1>;
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = parseCookies(ctx);

  if (!cookies["nextauth.token"]) {
    return {
      redirect: {
        destination: RotasEnum.LOGIN,
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

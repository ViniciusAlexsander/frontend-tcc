import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import { RotasEnum } from "../shared/utils/rotas";
import { withSSRAuth } from "../shared/utils/withSSRAuth";

export default function Perfil() {
  return <h1>Perfil</h1>;
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  return {
    props: {},
  };
});

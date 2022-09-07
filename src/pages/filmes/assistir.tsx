import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import { RotasEnum } from "../../shared/utils/rotas";

export default function Assistir() {
  return <h1>Assistir</h1>;
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

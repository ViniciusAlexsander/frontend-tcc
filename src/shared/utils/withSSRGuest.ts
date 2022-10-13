import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from "next";
import { parseCookies } from "nookies";
import { RotasEnum } from "./rotas";

export function withSSRGuest<P>(
  fn: GetServerSideProps<P>
): GetServerSideProps<P> {
  return async (
    ctx: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult<P>> => {
    const cookies = parseCookies(ctx);
    if (cookies["nextauth.token"]) {
      return {
        redirect: {
          destination: RotasEnum.INICIO,
          permanent: false,
        },
      };
    }

    return await fn(ctx);
  };
}

import React from "react";
import Head from "next/head";
import { Organizer } from "@components/organisms/organaizer/organizer.organism";
import Layout from "@components/layout";

export default function Organaizer() {
  return (
    <>
      <Head>
        <title>TMA | Органайзер</title>
      </Head>
      <Layout>
        <Organizer />
      </Layout>
    </>
  );
}

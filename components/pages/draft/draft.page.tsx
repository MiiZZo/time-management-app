import React, { useEffect } from "react";
import Head from "next/head";
import Layout from "@components/layout";

export default function DraftPage() {
  return (
    <>
      <Head>
        <title>TMA | Заметки</title>
      </Head>
      <Layout>
        <div>Заметки</div>
      </Layout>
    </>
  );
}

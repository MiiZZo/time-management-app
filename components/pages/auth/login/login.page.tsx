import React from "react";
import Head from "next/head";
import Layout from "@components/layout";
import { Login } from "@components/molecules/login.molecule";
import styles from "@shared/styles/auth.module.scss";

export default function LoginPage() {
  return (
    <>
      <Head>
        <title>TMA | Вход</title>
      </Head>
      <Layout>
        <div className={styles["Auth-Wrapper"]}>
          <h1 className={styles["Auth-Title"]}>Вход</h1>
          <Login />
        </div>
      </Layout>
    </>
  );
}

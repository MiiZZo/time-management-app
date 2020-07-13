import React from "react";
import Head from "next/head";
import { Register } from "@components/molecules/register.molecule";
import Layout from "@components/layout";
import styles from "@client:shared/styles/auth.module.scss";

export default function RegisterPage() {
  return (
    <>
      <Head>
        <title>TMA | Регистрация</title>
      </Head>
      <Layout>
        <div className={styles["Auth-Wrapper"]}>
          <h1 className={styles["Auth-Title"]}>Регистрация</h1>
          <Register />
        </div>
      </Layout>
    </>
  );
}

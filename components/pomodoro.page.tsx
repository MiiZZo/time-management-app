import React, { useContext } from "react";
import Head from "next/head";
import { Pomodoro } from "@components/molecules/pomodoro/pomodoro.molecule";
import { StoreContext } from "@client:shared/context/store";
import styles from "./pomodoro.module.scss";
import Layout from "./layout";

export function PomodoroPage() {
  const store = useContext(StoreContext);
  return (
    <div>
      <Head>
        <title>TMA | Pomodoro</title>
      </Head>
      <Layout>
        <div className={styles["PomodoroPage-Wrapper"]}>
          <Pomodoro />
        </div>
      </Layout>
    </div>
  );
}

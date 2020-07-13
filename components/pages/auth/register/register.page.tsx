import React, { useState, useEffect } from "react";
import Head from "next/head";
import { message } from "antd";
import { Register } from "@components/molecules/register.molecule";
import Layout from "@components/layout";
import styles from "@client:shared/styles/auth.module.scss";

message.config({
  maxCount: 3
});

export default function RegisterPage() {
  const [formData, setFormData] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmitForm = (data: any) => {
    setFormData(data);
    setIsSubmitting(true);
  };

  useEffect(() => {
    if (isSubmitting) {
      const fetchData = async () => {
        try {
          const response = await fetch("http://localhost:5000/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
            body: JSON.stringify(formData)
          });
          if (!response.ok) {
            const error = await response.json();
            return message.error(error.message);
          }
          message.success('Регистрация прошла успешно. Теперь вы можете войти, используя введеные данные.');
        } catch (e) {
          
        }
      };
      fetchData();
    }
  }, [isSubmitting, formData]);

  return (
    <>
      <Head>
        <title>TMA | Регистрация</title>
      </Head>
      <Layout>
        {error ? null : null}
        <div className={styles["Auth-Wrapper"]}>
          <h1 className={styles["Auth-Title"]}>Регистрация</h1>
          <Register onSubmitForm={handleSubmitForm}/>
        </div>
      </Layout>
    </>
  );
}

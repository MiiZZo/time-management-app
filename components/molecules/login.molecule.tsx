import React from "react";
import { Form, Input, Button } from "antd";

export const Login = (): JSX.Element => {
  return (
    <div>
      <Form>
        <Form.Item
          name="email"
          rules={[
            { required: true, message: "Данное поле является обязательным" }
          ]}
        >
          <Input placeholder="E-mail" />
        </Form.Item>
        <Form.Item
          rules={[
            { required: true, message: "Данное поле является обязательным" }
          ]}
          name="password"
        >
          <Input.Password placeholder="Пароль" />
        </Form.Item>
        <Form.Item>
          <Button block type="primary" htmlType="submit">
            Войти
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

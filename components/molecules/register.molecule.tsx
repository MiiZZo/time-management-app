import React from "react";
import { Form, Input, Button, Tooltip } from "antd";
import { QuestionOutlined } from "@ant-design/icons";

interface Props {
  onSubmitForm: (data: any) => void;
}

export const Register = ({ onSubmitForm }: Props): JSX.Element => {
  return (
    <div>
      <Form onFinish={onSubmitForm}>
        <Form.Item
          name="email"
          hasFeedback
          rules={[
            {
              type: "email",
              message: "Введенный е-email некорректный"
            },
            {
              required: true,
              message: "Данное поле является обязательным"
            }
          ]}
        >
          <Input placeholder="E-mail" />
        </Form.Item>
        <Form.Item
          name="password"
          hasFeedback
          rules={[
            {
              pattern: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
              message: "Пароль некорректный, наведите на вопросительный знак"
            },
            {
              required: true,
              message: "Данное поле является обязательным"
            }
          ]}
        >
          <Input.Password
            placeholder="Пароль"
            prefix={
              <Tooltip
                title="Минимум 8 символов, aA-zZ в нижнем и верхнем регистре, одна цифра и спецсимвол"
                placement="left"
              >
                <QuestionOutlined />
              </Tooltip>
            }
          />
        </Form.Item>
        <Form.Item
          name="repeatPassword"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Данное поле является обязательным"
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject("Введеные пароли не совпадают");
              }
            })
          ]}
        >
          <Input.Password placeholder="Пароль еще раз" />
        </Form.Item>
        <Form.Item>
          <Button block type="primary" htmlType="submit">
            Зарегистрироваться
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

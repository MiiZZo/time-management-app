import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Menu } from "antd";
import {
  FieldTimeOutlined,
  CalendarOutlined,
  FormOutlined,
  LogoutOutlined,
  UserOutlined,
  LoginOutlined
} from "@ant-design/icons";

interface Props {
  auth: boolean;
}

export const NavMenu = (props: Props): JSX.Element => {
  const router = useRouter();
  const { auth } = props;

  const AuthNav = [
    <Menu.Item key="/auth/register" icon={<LoginOutlined />}>
      <Link href="/auth/register">
        <a>Регистрация</a>
      </Link>
    </Menu.Item>,
    <Menu.Item key="/auth/login" icon={<LoginOutlined />}>
      <Link href="/auth/login">
        <a>Вход</a>
      </Link>
    </Menu.Item>
  ];
  return (
    <>
      {true ? (
        <div>
          <Menu mode="horizontal" activeKey={router.pathname}>
            <Menu.Item key="/profile" icon={<UserOutlined />}>
              <Link href="/profile">
                <a>Профиль</a>
              </Link>
            </Menu.Item>
            <Menu.Item key="/pomodoro" icon={<FieldTimeOutlined />}>
              <Link href="/pomodoro">
                <a>Pomodoro</a>
              </Link>
            </Menu.Item>
            <Menu.Item key="/organaizer" icon={<CalendarOutlined />}>
              <Link href="/organaizer">
                <a>Органайзер</a>
              </Link>
            </Menu.Item>
            <Menu.Item key="/draft" icon={<FormOutlined />}>
              <Link href="/draft">
                <a>Заметки</a>
              </Link>
            </Menu.Item>
            {auth ? (
              <Menu.Item key="logout" danger icon={<LogoutOutlined />}>
                Выйти
              </Menu.Item>
            ) : (
              AuthNav
            )}
          </Menu>
        </div>
      ) : null}
    </>
  );
};

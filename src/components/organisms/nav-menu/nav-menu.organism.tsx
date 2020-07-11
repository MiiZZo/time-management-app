import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, Button } from "antd";
import {
  FieldTimeOutlined,
  CalendarOutlined,
  FormOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SettingOutlined,
  UserOutlined
} from "@ant-design/icons";
import { cn } from "@bem-react/classname";
import "./nav-menu.scss";

const cnNavMenu = cn("NavMenu");

export const NavMenu = (): JSX.Element => {
  return (
    <div className={cnNavMenu("Wrapper")}>
      <Menu mode="horizontal" className={cnNavMenu("Menu")}>
        <Menu.Item icon={<UserOutlined />}>
          <Link to="/profile">Профиль</Link>
        </Menu.Item>
        <Menu.Item icon={<FieldTimeOutlined />}>
          <Link to="/pomodoro">Pomodoro</Link>
        </Menu.Item>
        <Menu.Item icon={<CalendarOutlined />}>
          <Link to="/organaizer">Органайзер</Link>
        </Menu.Item>
        <Menu.Item icon={<FormOutlined />}>
          <Link to="/draft">Заметки</Link>
        </Menu.Item>
        <Menu.Item danger icon={<LogoutOutlined />}>
          Выйти
        </Menu.Item>
      </Menu>
    </div>
  );
};

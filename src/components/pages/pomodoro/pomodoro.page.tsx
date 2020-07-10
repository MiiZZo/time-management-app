import React from "react";
import { cn } from "@bem-react/classname";
import { Pomodoro } from "@components/molecules/pomodoro/pomodoro.molecule";
import { NavMenu } from "@components/organisms/nav-menu/nav-menu.organism";
import "./pomodoro.page.scss";

const cnPomodoroPage = cn("PomodoroPage");

export const PomodoroPage = (): JSX.Element => {
  return (
    <div>
      <NavMenu />
      <div className={cnPomodoroPage("Wrapper")}>
        <Pomodoro />
      </div>
    </div>
  );
};

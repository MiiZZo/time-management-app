import React from "react";
import { cn } from "@bem-react/classname";
import { Pomodoro } from "@components/molecules/pomodoro/pomodoro.molecule";
import "./pomodoro.page.scss";

const cnPomodoroPage = cn("PomodoroPage");

export const PomodoroPage = (): JSX.Element => {
  return (
    <div className={cnPomodoroPage("Wrapper")}>
      <Pomodoro />
    </div>
  );
};

import { PomodoroSettings } from "@components/molecules/pomodoro-settings/pomodoro-settings.molecule";
import { PomodoroPage } from "@components/pages/pomodoro.page";

interface Route {
  name: string;
  path: string;
  component: React.FunctionComponent<{}>;
  exact: boolean;
}

const routes: Route[] = [
  {
    name: "pomodoro",
    path: "/pomodoro",
    component: PomodoroPage,
    exact: true,
  },
  {
    name: "pomodoroSettings",
    path: "/pomodoro-settings",
    component: PomodoroSettings,
    exact: true,
  },
];

export { routes };

import { Pomodoro } from '@components/organisms/Pomodoro/pomodoro.organism';
import { PomodoroSettings } from '@components/organisms/Pomodoro/pomodoro-settings.organism';

interface Route {
    name: string
    path: string
    component: React.ComponentClass<any, any> 
    | React.FunctionComponent<any> 
    exact: boolean
}

const routes: Route[] = [
    {
        name: 'pomodoro',
        path: '/pomodoro',
        component: Pomodoro,
        exact: true
    },
    {
        name: 'pomodoroSettings',
        path: '/pomodoro-settings',
        component: PomodoroSettings,
        exact: true
    }
];

export { routes }

import { createStore } from 'effector';

export interface Pomodoro {
    soundVolume: number
    pomodoroNumber: number
    soundOff: boolean
}

let defaultSoundOffValue = false;
let defaultSoundVolume = 0.5;
let defaultPomodoroNumber = 1;

if (localStorage.getItem('soundOff') === '1') {
    defaultSoundOffValue = true;
}

const potentialSoundVolumeValue = localStorage.getItem('soundVolume');

if (potentialSoundVolumeValue !== null && !isNaN(Number(potentialSoundVolumeValue))) {
    defaultSoundVolume = Number(potentialSoundVolumeValue);
}

export const $pomodoro = createStore<Pomodoro>({
    soundVolume: defaultSoundVolume,
    pomodoroNumber: defaultPomodoroNumber,
    soundOff: defaultSoundOffValue
});

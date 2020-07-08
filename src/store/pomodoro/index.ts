import { createEvent, createEffect } from 'effector';

export const toggleSoundOff = createEvent('toggleSoundOff');
export const changeSoundVolume = createEvent<number>('changeSoundVolume');
export const incrementPomodoroNumber = createEvent('incrementPomodoroNumber');
export const resetPomodoroNumber = createEvent('resetPomodoroNumber');

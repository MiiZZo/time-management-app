import { $pomodoro, Pomodoro } from './store';
import { changeSoundVolume, incrementPomodoroNumber, toggleSoundOff, resetPomodoroNumber } from './';

$pomodoro
.on(incrementPomodoroNumber, (state) => {
    return {
        ...state,
        pomodoroNumber: state.pomodoroNumber + 1
    }
})
.on(resetPomodoroNumber, (state) => {
    return {
        ...state,
        pomodoroNumber: 1
    }
})
.on(toggleSoundOff, (state) => {
    return {
        ...state,
        soundOff: !state.soundOff
    }
})
.on(changeSoundVolume, (state, newSoundVolume) => {
    return {
        ...state,
        soundVolume: newSoundVolume
    }
});

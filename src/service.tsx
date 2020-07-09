import { useReducer, useEffect } from 'react';
import { Model } from './model';

interface State {
    soundVolume: number
    soundOff: boolean
    minutesCount: {
        pomodoro: number
        pause: number
        longPause: number
    }
}

let soundVolumeValue = 0.5;
let soundOffValue = false;
let minutesCountValue: State['minutesCount'] = {
    pomodoro: 25,
    pause: 5,
    longPause: 30
}

export class Service {
    constructor(
        private model = new Model()
    ) {}

    useStore = () => {
        return useReducer(this.reducer, this.initializeState());
    }

    reducer = (_state: State, action: any) => {
        const state: State = action.state;
        let key: keyof State;
        for (key in (action.state as State)) {
                if (_state[key] !== action.state[key]) {
                    const newValue = action.state[key];
                    switch (key) {
                        case 'soundVolume':
                            this.changeSoundVolume(newValue);
                            break
                        case 'soundOff':
                            console.log(newValue);
                            this.changeSoundOffValue(newValue);
                            break
                        case 'minutesCount':
                            this.changeMinutesCount(newValue);
                            break
                    }
                }

        }

        return state;
    }

    changeSoundVolume = (value: number) => {
        this.model.setItem('soundVolume', value);
    }

    changeSoundOffValue = (value: boolean) => {
        this.model.setItem('soundOff', value);
    }

    changeMinutesCount = (minutesCount: State['minutesCount']) => {
        this.model.setItem('minutes', minutesCount);
    }

    initializeState = () => {
        const state: State = {
            soundVolume: 0.5,
            soundOff: false,
            minutesCount: {
                pomodoro: 25,
                pause: 5,
                longPause: 30
            }
        }
        const soundVolume = this.model.getItem('soundVolume');
        const soundOff = this.model.getItem('soundOff');
        const minutesCount = this.model.getItem('minutes');
        
        return {
            soundVolume,
            soundOff,
            minutesCount
        }
    }
}

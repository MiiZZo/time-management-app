import React, { useState, useEffect } from 'react';
import { Progress, Button, InputNumber, Checkbox, Spin } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { Slider } from '../molecules/Slider';
import CompleteAudioFile from '@public/complete.mp3';
import tickAudioFile from '@public/tick.mp3';

const defaultTimeValues = {
    pomodoro: {
        minutes: 25,
        seconds: 0
    },
    pause: {
        minutes: 5,
        seconds: 0
    },
    longPause: {
        minutes: 30,
        seconds: 0
    }
}

const audio = new Audio(CompleteAudioFile);
const tickAudio = new Audio(tickAudioFile);

export const Pomodoro = (): JSX.Element => {
    const [timeValues, setTimeValues] = useState(defaultTimeValues);
    const [time, setTime] = useState(defaultTimeValues.pomodoro);
    const [timerStarted, setTimerStarted] = useState(false);
    const [timerType, setTimerType] = useState<'pomodoro' | 'pause' | 'long pause'>('pomodoro');
    const [intervalID, setIntervalID] = useState<NodeJS.Timeout | null>(null);
    const [pomodoroCount, setPomodoroCount] = useState(0);
    const [soundOff, setSoundOffStatus] = useState(false);
    const [audioVolume, setAudioVolume] = useState(0.5);
    const [loading, setLoading] = useState(true);
    const [audioPlaying, setAudioPlaying] = useState(false);

    useEffect(() => {
        window.onbeforeunload = () => {
            localStorage.setItem('volume', audioVolume.toString());
            localStorage.setItem('soundOff', soundOff ? '1' : '0');
        }
    });

    useEffect(() => {
        const potentialAudioVolume = window.localStorage.getItem('volume');
        if (potentialAudioVolume !== null) {
            setAudioVolume(+potentialAudioVolume);
        }
        const potentialSoundOffStatus = window.localStorage.getItem('soundOff');
        if (potentialSoundOffStatus !== null) {
            setSoundOffStatus(Boolean(Number(potentialSoundOffStatus)));
        }

        setLoading(false);
    }, []);

    useEffect(() => {
        if (timerStarted) {
            setIntervalID(setInterval(() => {
                setTime(time => {
                    let { minutes, seconds } = time;
                    if (minutes <= 0 && seconds <= 0) {
                        handleChangePomodoroCount();
                    }

                    if (seconds <= 0) {
                        seconds = 59;
                        minutes = minutes - 1;
                    }

                    seconds = seconds - 1;

                    return { minutes, seconds }
                });
            }, 1000));
        }
    }, [timerStarted]);

    const playAudioComplete = () => {
        setSoundOffStatus((soundOff) => {
            if (!soundOff) {
                setAudioVolume((audioVolume) => {
                    audio.volume = audioVolume;
                    audio.play();
                    
                    return audioVolume;
                });
            }

            return soundOff;
        });
    }

    const togglePlayAudioTick = () => {
        if (!audioPlaying) {
            tickAudio.loop = true;
            tickAudio.volume = audioVolume;
            tickAudio.play();   
        } else {
            tickAudio.pause();
        }
    }

    const handleChangePomodoroCount = () => {
        playAudioComplete();
        setTimerType(timerType => {
            setPomodoroCount((pomodoroCount) => {
                if (timerType === 'pomodoro') {          
                    if (pomodoroCount === 3) {
                        setTimerType('long pause');
                        setTime(timeValues.longPause);
                        return 0;
                    } else {
                        setTimerType('pause');
                        setTime(timeValues.pause);
                    }
                } else {
                    setTimerType('pomodoro');
                    setTime(timeValues.pomodoro);
                }

                if (timerType === 'pomodoro') {
                    return pomodoroCount + 1;
                }

                return pomodoroCount;
            });

            return timerType;
        });
    }

    const handleToggleTimerStatus = () => {
        if (timerStarted) {
            resetTimer();
        } else {
            startTimer();
        }
    }

    const resetTimer = () => {
        if (intervalID) {
            clearInterval(intervalID);
            setTimerStarted(false);
            setTime(timeValues.pomodoro);
            setAudioPlaying(false);
            togglePlayAudioTick();
        }
    }

    const startTimer = () => {
        setTimerStarted(true);
    }

    const handleChangeTimeMinutes = (name: string, value: string | number | undefined) => {
        if (value !== undefined) {
            setTimeValues({...timeValues, [name]: {
                minutes: +value,
                seconds: 0
            }});
        }
    }

    const handleChangeSoundOnStatus = (e: CheckboxChangeEvent) => {
        
        setSoundOffStatus((soundOff) => {
            if (!soundOff) {
                setAudioPlaying(false);
                audio.pause();
                tickAudio.pause();
            }

            return !soundOff;
        });
    }

    const handleChangeAudioVolume = (value: string | number | undefined) => {
        if (value) {
            setAudioVolume((audioVolume) => {
                const newAudioVolume = +value / 100;
                tickAudio.volume = newAudioVolume;
                audio.volume = newAudioVolume;

                return newAudioVolume;
            });
        }
    }

    let percent: null | number = null;

    switch (timerType) {
        case 'pomodoro':
            percent = ((time.minutes + (time.seconds / 60)) / timeValues.pomodoro.minutes) * 100;
            break
        case 'pause':
            percent = ((time.minutes + (time.seconds / 60)) / timeValues.pause.minutes) * 100;
            break
        case 'long pause':
            percent = ((time.minutes + (time.seconds / 60)) / timeValues.longPause.minutes) * 100;
            break
    }

    let inputs: JSX.Element[] = [];

    for (let key in timeValues) {
        if (key === 'pomodoro' || key === 'pause' || key === 'longPause') {
            inputs.push(
                <div key={key}>
                    <label>
                        Минуты для помидорки
                        <br />
                        <InputNumber
                            className="Input"
                            value={timeValues[key].minutes}
                            min={1}
                            max={60}
                            onChange={(value) => handleChangeTimeMinutes(key, value)}
                        />
                    </label>
                </div>
            );
        }
    }

    if (timerStarted && !audioPlaying && !soundOff) {
        setAudioPlaying(true);
        togglePlayAudioTick();
    }

    if (loading) {
        return (
            <div className="Container">
                <Spin />
            </div>
        )
    }

    return (
        <div className='Container'>
            <h1>Задача</h1>
            <h3>Номер помидорки - {pomodoroCount + 1}</h3>
            <Progress
                strokeColor={timerType === 'pomodoro' ? undefined : 'orange'}
                type="circle"
                percent={percent}
                success={{strokeColor: 'red'}}
                format={() => formatTime(time)}
                status="active"
            />
            <Button 
                block
                className='StartButton' 
                onClick={handleToggleTimerStatus} 
                type="primary"
            >
                { timerStarted ? 'Сбросить' :  'Начать' }
            </Button>
            <div className="SliderWrapper">
                <label>
                    Громкость звука
                    <Slider
                        audioVolume={Math.floor(audioVolume * 100)}
                        onChange={handleChangeAudioVolume}
                    />
                </label>
                <Checkbox
                    checked={soundOff}
                    className="ToggleSoundButton"
                    onChange={handleChangeSoundOnStatus}
                >
                    Отключить звук 
                    <br />(Оповещание об окончании времени не будет отключено)
                </Checkbox>
            </div>
            {/* <div className="FormWrapper">
                {inputs}
            </div> */}
        </div>
    )
}

function formatTime(time: { minutes: number, seconds: number }) {
    let minutes = `${time.minutes}`;
    let seconds = `${time.seconds}`;

    if (minutes.length !== 2) {
        minutes = `0${minutes}`;
    }
    if (seconds.length !== 2) {
        seconds = `0${seconds}`;
    }

    return `${minutes}:${seconds}`
}
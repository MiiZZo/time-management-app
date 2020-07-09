import React, { useEffect } from 'react';
import { InputNumber, Switch, Form, Button, Slider, message } from 'antd';
import { cn } from '@bem-react/classname';
import { Service } from '../../../service';
import './pomodoro-settings.scss';

const cnPomodoroSettings = cn('PomodoroSettings');
const service = new Service();
message.config({
    duration: 2,
    maxCount: 3,
});

const PomodoroSettings = () => {
    const [state, dispatcher] = service.useStore();

    useEffect(() => {
        document.title = 'Настройки'
    }, []);

    const handleSubmitChanges = (values: any) => {
        if (values !== null) {
            const { soundVolume, soundOff, pomodoro, pause, longPause } = values;
            const state = {
                soundVolume: soundVolume / 100,
                soundOff,
                minutesCount: {
                    pomodoro, 
                    pause, 
                    longPause
                }
            }
            dispatcher({ state });
            message.success('Изменения успешно сохранены')
        }
    }

    let inputs: JSX.Element[] = [];

    for (let key in state.minutesCount) {
        if (key === 'pomodoro' || key === 'pause' || key === 'longPause') {
            let labelText = 'Минуты для';
            switch (key) {
                case 'pomodoro':
                    labelText = `${labelText} помидорки`
                    break
                case 'pause':
                    labelText = `${labelText} короткой паузы`
                    break
                case 'longPause':
                    labelText = `${labelText} длинной паузы`
                    break
            }

            inputs.push(
                <Form.Item
                    name={key}
                    label={labelText}
                >
                    <InputNumber
                        className={cnPomodoroSettings('Input')}
                        min={1}
                        max={60}
                    />
                </Form.Item>
            );
        }
    }

    const formInitialValues = {
        soundVolume: state.soundVolume * 100,
        soundOff: state.soundOff,
        pomodoro: state.minutesCount.pomodoro,
        pause: state.minutesCount.pause,
        longPause: state.minutesCount.longPause
    }

    return (
        <div className={cnPomodoroSettings()}>
            <div className={cnPomodoroSettings('Container')}>
                <Form
                    onFinish={handleSubmitChanges}
                    initialValues={formInitialValues}
                    layout="vertical"
                >
                    <Form.Item
                        name="soundVolume"
                        label="Громкость звука"
                    >
                        <Slider min={0} max={100} />
                    </Form.Item>
                    <Form.Item
                        name="soundOff"
                        label="Отключить звук"
                    >
                        <Switch defaultChecked={state.soundOff}/>
                    </Form.Item>
                    {inputs}
                    <Form.Item>
                        <Button block htmlType="submit" type="primary">Сохранить изменения</Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export {
    PomodoroSettings
}

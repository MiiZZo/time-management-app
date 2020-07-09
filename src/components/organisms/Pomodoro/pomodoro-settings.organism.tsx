import React from 'react';
import { InputNumber, Switch, Form, Button, Slider } from 'antd';
import { Service } from '../../../service';

const service = new Service();

const PomodoroSettings = () => {
    const [state, dispatcher] = service.useStore();
    const handleSubmitChanges = (values: any) => {
        if (values !== null) {
            const { soundVolume, soundOff, pomodoro, pause, longPause } = values;
            const state = {
                soundVolume,
                soundOff,
                minutesCount: {
                    pomodoro, 
                    pause, 
                    longPause
                }
            }
            dispatcher({ state });
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
                        className="Input"
                        min={1}
                        max={60}
                    />
                </Form.Item>
            );
        }
    }

    const formInitialValues = {
        soundVolume: state.soundVolume,
        soundOff: state.soundOff,
        pomodoro: state.minutesCount.pomodoro,
        pause: state.minutesCount.pause,
        longPause: state.minutesCount.longPause
    }

    return (
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
                <Switch />
            </Form.Item>
            {inputs}
            <Form.Item>
                <Button block htmlType="submit" type="primary">Сохранить изменения</Button>
            </Form.Item>
        </Form>
    )
}


export {
    PomodoroSettings
}

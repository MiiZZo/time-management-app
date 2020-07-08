import React, { useState } from 'react';
import { InputNumber, Switch, Form, Button } from 'antd';

export const PomodoroSettings = () => {
    const [timeValues, setTimeValues] = useState();

    // const handleChangeTimeMinutes = (name: string, value: string | number | undefined) => {
    //     if (value !== undefined) {
    //         setTimeValues({...timeValues, [name]: {
    //             minutes: +value,
    //             seconds: 0
    //         }});
    //     }
    // }

    // const handleChangeSoundOnStatus = (e: CheckboxChangeEvent) => {
    //     setSoundOffStatus((soundOff) => {
    //         if (!soundOff) {
    //             setAudioPlaying(false);
    //             audio.pause();
    //             tickAudio.pause();
    //         }

    //         return !soundOff;
    //     });
    // }

    // let inputs: JSX.Element[] = [];

    // for (let key in timeValues) {
    //     if (key === 'pomodoro' || key === 'pause' || key === 'longPause') {
    //         let labelText = 'Минуты для';

    //         switch (key) {
    //             case 'pomodoro':
    //                 labelText = `${labelText} Помидорки`
    //                 break
    //             case 'pause':
    //                 labelText = `${labelText} короткой паузы`
    //                 break
    //             case 'longPause':
    //                 labelText = `${labelText} длинной паузы`
    //                 break
    //         }

    //         inputs.push(
    //             <Form.Item
    //                 name={key}
    //                 label={labelText}
    //             >
    //                 <InputNumber
    //                     className="Input"
    //                     min={1}
    //                     max={60}
    //                 />
    //             </Form.Item>
    //         );
    //     }
    // }

    let formInitialValues = {
        pomodoro: 25,
        longPause: 0,
        pause: 0
    };

    // for (let key in timeValues) {
    //     if (key === 'pomodoro' || key === 'pause' || key === 'longPause') {
    //         formInitialValues[key] = timeValues[key].minutes;
    //     }
    // }
    
    return (
        <Form
            onFinish={(values: any) => console.log(values)}
            layout="horizontal"
        >
            <Form.Item
                name="soundOff"
                label="Отключить звук"
            >
                <Switch />
            </Form.Item>
            <Form.Item>
                <Button block htmlType="submit" type="primary">Сохранить изменения</Button>
            </Form.Item>
        </Form>
    )
}

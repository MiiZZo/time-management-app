import React from 'react';
import { InputNumber, Slider } from 'antd';
import { SliderValue } from 'antd/lib/slider';

interface Props {
    audioVolume: number,
    onChange: ((value: string | number | undefined) => void)
}

export const SliderWithInput = (props: Props) => {
    const {
        audioVolume,
        onChange
    } = props;
    
    return (
        <>
            <Slider
                className="Slider"
                min={0}
                max={100}
                onChange={onChange as ((value: SliderValue) => void)}
                value={audioVolume}
            />
        </>
    )
}

import React from "react";
import { Slider as SliderComponent } from "antd";

interface Props {
  audioVolume: number;
  onChange: (value: string | number | undefined) => void;
}

export const Slider = (props: Props) => {
  const { audioVolume, onChange } = props;

  return (
    <>
      <SliderComponent
        className="Slider"
        min={0}
        max={100}
        onChange={onChange as (value: number) => void}
        value={audioVolume}
      />
    </>
  );
};

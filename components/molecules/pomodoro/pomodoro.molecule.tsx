import React, { useState, useEffect, useCallback } from "react";
import { Progress, Button, Input } from "antd";
// import CompleteAudioFile from "@public/complete.mp3";
// import tickAudioFile from "@public/tick.mp3";
import styles from "./pomodoro.module.scss";

const audio = {
  play: () => 5,
  pause: () => 5,
  loop: false,
  volume: 0
};

const tickAudio = {
  play: () => 5,
  pause: () => 5,
  loop: false,
  volume: 0
};

export const Pomodoro = (): JSX.Element => {
  const timeValues = {
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
  };

  const [time, setTime] = useState(timeValues.pomodoro);
  const [timerStarted, setTimerStarted] = useState(false);
  const [timerType, setTimerType] = useState<
    "pomodoro" | "pause" | "long pause"
  >("pomodoro");
  const [intervalID, setIntervalID] = useState<NodeJS.Timeout | null>(null);
  const [pomodoroCount, setPomodoroCount] = useState(0);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [taskName, setTaskName] = useState("");
  const soundOff = true;
  const soundVolume = 0;

  const playAudioComplete = useCallback(() => {
    if (!soundOff) {
      audio.volume = soundVolume;
      audio.play();
    }
  }, [soundVolume, soundOff]);

  const handleChangePomodoroCount = useCallback(() => {
    playAudioComplete();
    setTimerType((timerType) => {
      setPomodoroCount((pomodoroCount) => {
        if (timerType === "pomodoro") {
          if (pomodoroCount === 3) {
            setTimerType("long pause");
            setTime(timeValues.longPause);
            return 0;
          } else {
            setTimerType("pause");
            setTime(timeValues.pause);
          }
        } else {
          setTimerType("pomodoro");
          setTime(timeValues.pomodoro);
        }

        if (timerType === "pomodoro") {
          return pomodoroCount + 1;
        }

        return pomodoroCount;
      });

      return timerType;
    });
  }, [playAudioComplete, timeValues]);

  useEffect(() => {
    if (timerStarted) {
      setIntervalID(
        setInterval(() => {
          setTime((time) => {
            let { minutes, seconds } = time;
            if (minutes <= 0 && seconds <= 0) {
              handleChangePomodoroCount();
            }
            if (seconds <= 0) {
              seconds = 59;
              minutes = minutes - 1;
            }
            seconds = seconds - 1;
            console.log(minutes, seconds);
            return { minutes, seconds };
          });
        }, 1000)
      );
    }
  }, [timerStarted]);

  const togglePlayAudioTick = () => {
    if (!audioPlaying) {
      setAudioPlaying(true);
      tickAudio.loop = true;
      tickAudio.volume = soundVolume;
      tickAudio.play();
    } else {
      tickAudio.pause();
    }
  };

  const handleToggleTimerStatus = () => {
    if (timerStarted) {
      resetTimer();
    } else {
      startTimer();
    }
  };

  const resetTimer = () => {
    if (intervalID) {
      clearInterval(intervalID);
      setTimerStarted(false);
      setTime(timeValues.pomodoro);
      setAudioPlaying(false);
      togglePlayAudioTick();
    }
  };

  const startTimer = () => {
    setTimerStarted(true);
  };

  const handleChangeTaskName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskName(e.target.value);
  };

  let percent: null | number = null;

  switch (timerType) {
    case "pomodoro":
      percent =
        ((time.minutes + time.seconds / 60) / timeValues.pomodoro.minutes) *
        100;
      break;
    case "pause":
      percent =
        ((time.minutes + time.seconds / 60) / timeValues.pause.minutes) * 100;
      break;
    case "long pause":
      percent =
        ((time.minutes + time.seconds / 60) / timeValues.longPause.minutes) *
        100;
      break;
  }

  if (timerStarted && !audioPlaying && !soundOff) {
    togglePlayAudioTick();
  }

  return (
    <div>
      <div className={styles["Pomodoro-Container"]}>
        {timerStarted ? (
          <p className={styles["Pomodoro-TaskName"]}>{taskName}</p>
        ) : (
          <Input
            placeholder="Что вам нужно сделать?"
            value={taskName}
            onChange={handleChangeTaskName}
          />
        )}
        <h3 className={styles["Pomodoro-Number"]}>
          Номер помидорки - {pomodoroCount + 1}
        </h3>
        <Progress
          strokeColor={timerType === "pomodoro" ? undefined : "orange"}
          type="circle"
          percent={percent}
          success={{ strokeColor: "red" }}
          format={() => formatTime(time)}
          status="active"
        />
        <Button
          block
          className={styles["Pomodoro-StartButton"]}
          onClick={handleToggleTimerStatus}
          type="primary"
        >
          {timerStarted ? "Сбросить" : "Начать"}
        </Button>
      </div>
    </div>
  );
};

function formatTime(time: { minutes: number; seconds: number }) {
  let minutes = `${time.minutes}`;
  let seconds = `${time.seconds}`;

  if (minutes.length !== 2) {
    minutes = `0${minutes}`;
  }
  if (seconds.length !== 2) {
    seconds = `0${seconds}`;
  }

  return `${minutes}:${seconds}`;
}

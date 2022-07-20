import "./styles.css";
import React, { useState } from "react";
import { Button, Space } from "antd";
import "antd/dist/antd.css";

export default function App() {
  const interval = 1000;
  let [action, setAction] = useState("stop");
  let [timerControls, setTimerControls] = useState({
    start: function () {
      this.id = setInterval(() => {
        if (this.shouldChangeMinute()) {
          this.seconds = 59;
          this.minutes--;
        } else if (this.seconds > 0) {
          this.seconds--;
        } else this.stop();
        setTimerControls({ ...this });
      }, interval);
    },
    shouldChangeMinute: function () {
      return this.seconds === 0 && this.minutes > 0;
    },
    stop: function () {
      clearInterval(this.id);
    },
    reset: function () {
      this.stop();
      setTimerControls({ ...this, minutes: 0, seconds: 0 });
    },
    minutes: 0,
    seconds: 0
  });
  let { seconds, minutes } = timerControls;

  return (
    <div className="squared-container centered">
      <Space direction="vertical" size="large">
        <Space>
          <input
            name="minutes"
            type="number"
            onChange={onChange}
            value={minutes}
            disabled={shouldDisableInput()}
          />
          <p>:</p>
          <input
            name="seconds"
            type="number"
            onChange={onChange}
            value={seconds}
            disabled={shouldDisableInput()}
          />
        </Space>

        <Space direction>
          <Button
            name="start"
            onClick={onTimerChange}
            disabled={shouldDisableStart()}
          >
            Start
          </Button>
          <Button
            name="stop"
            onClick={onTimerChange}
            disabled={shouldDisableStop()}
          >
            Stop
          </Button>
          <Button
            name="reset"
            onClick={onTimerChange}
            disabled={timerIsEmpty()}
          >
            Reset
          </Button>
        </Space>
      </Space>
    </div>
  );

  function shouldDisableInput() {
    return action === "start";
  }

  function onTimerChange(e) {
    setAction(e.currentTarget.name);
    timerControls[e.currentTarget.name]();
  }

  function shouldDisableStop() {
    return timerIsEmpty() || action !== "start";
  }

  function shouldDisableStart() {
    return timerIsEmpty() || action === "start";
  }

  function timerIsEmpty() {
    return !minutes && !seconds;
  }

  function onChange(e) {
    timerControls[e.target.name] = correctNumber(e.target.value);
    setTimerControls({ ...timerControls });
  }

  function correctNumber(number) {
    if (number > 99) return 99;
    if (number < 0) return 0;
    return number;
  }
}

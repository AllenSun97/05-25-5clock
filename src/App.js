import { useState } from "react";
import "./App.css";
import TimerLengthControl from "./TimerLengthControl";

const accurateInterval = (time) => {};

function App() {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [timer, setTimer] = useState({
    timerState: "stop",
    timerType: "session",
    time: 1500,
  });

  const reset = () => {
    setBreakLength(5);
    setSessionLength(25);
    setTimer({
      timerState: "stop",
      timerType: "session",
      time: 1500,
    });
    clearInterval(window.TTT);
  };
  const timerControl = () => {
    if (timer.timerState === "stop") {
      beginCountDown();
      setTimer({ ...timer, timerState: "run" });
    } else {
      clearInterval(window.TTT);
      setTimer({ ...timer, timerState: "stop" });
    }
  };

  const beginCountDown = () => {
    window.TTT = setInterval(() => {
      decrementTimer();
      phaseControl();
    }, 1000);
  };
  const decrementTimer = () => {
    setTimer({ ...timer, time: timer.time-- });
    console.log(timer.time);
  };
  const phaseControl = () => {
    if (timer.time < 0) {
      if (timer.timerType === "session") {
        switchTimer(breakLength * 60, "break");
        beginCountDown();
      } else {
        switchTimer(sessionLength * 60, "session");
        beginCountDown();
      }
    }
  };
  const switchTimer = (num, str) => {
    setTimer({ ...timer, time: num, timerType: str });
  };
  const clockify = () => {
    let minutes = Math.floor(timer.time / 60);
    let seconds = timer.time - minutes * 60;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    return minutes + ":" + seconds;
  };
  return (
    <div>
      <div className="main-title">25 + 5 Clock</div>
      <div className="timer">
        <TimerLengthControl
          addID="break-increment"
          minID="break-decrement"
          lengthID="break-length"
          title="Break Length"
          ID="break-label"
          length={breakLength}
          setLength={setBreakLength}
          timer={timer}
          setTimer={setTimer}
          timerType={"break"}
        />
        <TimerLengthControl
          addID="session-increment"
          minID="session-decrement"
          lengthID="session-length"
          title="Session Length"
          ID="session-label"
          length={sessionLength}
          setLength={setSessionLength}
          timer={timer}
          setTimer={setTimer}
          timerType={"session"}
        />
      </div>
      <div id="timer-label">
        Session
        <div id="time-left">{clockify()}</div>
      </div>

      <div className="timer-control">
        <button id="start_stop" onClick={() => timerControl()}>
          <i className="fa fa-play fa-2x" />
          <i className="fa fa-pause fa-2x" />
        </button>
        <button id="reset" onClick={reset}>
          <i className="fa fa-refresh fa-2x" />
        </button>
      </div>
    </div>
  );
}

export default App;

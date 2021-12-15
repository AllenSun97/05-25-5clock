import { useState, useReducer } from "react";
import reducer from "./reducer";
import "./App.css";
import TimerLengthControl from "./TimerLengthControl";

function App() {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [timer, setTimer] = useState({
    timerState: "stop",
    timerType: "Session",
  });
  // const [time, setTime] = useState(1500);
  const [state, dispatch] = useReducer(reducer, 1500);

  const reset = () => {
    setBreakLength(5);
    setSessionLength(25);
    setTimer({
      timerState: "stop",
      timerType: "Session",
    });
    dispatch({ type: "RESET" });
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
      // setTime((time) => time - 1); // (prevState) => {reutrn prevState+1}
      phaseControl();
      dispatch({ type: "DECREMENT" });
    }, 1000);
  };

  const phaseControl = () => {
    console.log(state);
    if (state <= 0) {
      console.log("WERE IN");
      if (timer.timerType === "Session") {
        console.log("changing");
        switchTimer(breakLength * 10, "Break");
        beginCountDown();
      } else {
        console.log(" NOT changing");
        switchTimer(sessionLength * 10, "Session");
        beginCountDown();
      }
    }
  };
  const switchTimer = (num, str) => {
    setTimer({ ...timer, timerType: str });
    dispatch({ type: "DECREMENT", payload: num });
  };
  const clockify = () => {
    let minutes = Math.floor(state / 60);
    let seconds = state - minutes * 60;
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
          setTime={dispatch}
          timer={timer}
          timerType={"Break"}
        />
        <TimerLengthControl
          addID="session-increment"
          minID="session-decrement"
          lengthID="session-length"
          title="Session Length"
          ID="session-label"
          length={sessionLength}
          setLength={setSessionLength}
          setTime={dispatch}
          timer={timer}
          timerType={"Session"}
        />
      </div>
      <div id="timer-label">
        {timer.timerType}
        <div id="time-left">{clockify()}</div>
      </div>

      <div className="timer-control">
        <button id="start_stop" onClick={timerControl}>
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

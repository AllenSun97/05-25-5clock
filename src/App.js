import { useState } from "react";
import "./App.css";
import TimerLengthControl from "./TimerLengthControl";

function App() {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [time, setTime] = useState(1500);
  const [timer, setTimer] = useState({
    timerState: "stop",
    timerType: "Session",
  });

  const reset = () => {
    setBreakLength(5);
    setSessionLength(25);
    setTimer({
      timerState: "stop",
      timerType: "Session",
    });
    setTime(1500);
    clearInterval(window.TTT);
    // this.audioBeep.pause();
    // this.audioBeep.currentTime = 0;
  };
  // const buzzer = (_timer) => {
  //   if (_timer === 0) {
  //     this.audioBeep.play();
  //   }
  // };
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
      setTime((time) => time - 1); // (prevState) => {reutrn prevState+1}
      phaseControl();
    }, 1000);
  };

  const phaseControl = () => {
    // buzzer(time);
    if (time <= 0) {
      if (timer.timerType === "Session") {
        switchTimer(breakLength * 60, "Break");
        beginCountDown();
      } else {
        switchTimer(sessionLength * 60, "Session");
        beginCountDown();
      }
    }
  };
  const switchTimer = (num, str) => {
    setTimer({ ...timer, timerType: str });
    setTime(num);
  };
  const clockify = () => {
    let minutes = Math.floor(time / 60);
    let seconds = time - minutes * 60;
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
          setTime={setTime}
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
          setTime={setTime}
          timer={timer}
          timerType={"Session"}
        />
      </div>
      <div id="timer-label">
        {timer.timerType}
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
      <audio
        id="beep"
        preload="auto"
        // ref={(audio) => {
        //   this.audioBeep = audio;
        // }}
        src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
      />
    </div>
  );
}

export default App;

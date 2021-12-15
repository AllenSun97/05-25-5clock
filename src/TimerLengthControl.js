import React from "react";

const TimerLengthControl = ({
  addID,
  minID,
  lengthID,
  title,
  ID,
  length,
  setLength,
  setTime,
  timer,
  timerType,
}) => {
  const lengthControl = (sign, length, timerType) => {
    if (timer.timerState === "run") {
      return;
    }
    if (timer.timerType === timerType) {
      if (sign === "-" && length !== 1) {
        setLength(length - 1);
        setTime({ type: "SETSTATE", payload: length * 10 - 10 });
      } else if (sign === "+" && length !== 10) {
        setLength(length + 1);
        setTime({ type: "SETSTATE", payload: length * 10 + 10 });
      }
    } else if (sign === "-" && length !== 1) {
      setLength(length - 1);
    } else if (sign === "+" && length !== 10) {
      setLength(length + 1);
    }
  };

  return (
    <div className="length-control">
      <div id={ID}>{title}</div>
      <div style={{ display: "flex", marginTop: 40 }}>
        <button
          className="btn-level"
          id={minID}
          onClick={(e) =>
            lengthControl(e.currentTarget.value, length, timerType)
          }
          value="-"
        >
          <i className="fa fa-arrow-down fa-2x" />
        </button>
        <div className="btn-level" id={lengthID}>
          {length}
        </div>
        <button
          className="btn-level"
          id={addID}
          onClick={(e) =>
            lengthControl(e.currentTarget.value, length, timerType)
          }
          value="+"
        >
          <i className="fa fa-arrow-up fa-2x" />
        </button>
      </div>
    </div>
  );
};

export default TimerLengthControl;

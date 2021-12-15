import React from "react";

const reducer = (state, action) => {
  switch (action.type) {
    case "DECREMENT":
      return state - 1;
    case "SETSTATE":
      return (state = action.payload);
    case "RESET":
      return (state = 1500);
  }
};
export default reducer;

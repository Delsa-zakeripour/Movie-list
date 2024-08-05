import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Flash from "./FlashCards";
import StarRating from "./StarRating";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <App />
    {/* <StarRating
      maxRaiting={5}
      massage={["awful", "bad", "not bad", "good", "amazing"]}
    />
    <StarRating size={22} color={"blue"} className="test" /> */}

    {/* <Flash /> */}
  </>
);

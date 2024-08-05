import { useState } from "react";
import "./index.css";

const countainerStyle = {
  display: " flex",
  alignItem: "center",
};

const starCountainer = {
  display: "flex",
  //   gap: "4",
  fontSize: "20px",
};

export default function StarRating({
  maxRaiting = 10,
  color = "yellow",
  size = 48,
  onSetRating,
  className,
  defaultRating = 0,
  massage = [],
}) {
  const [rate, setRate] = useState(defaultRating);
  const [tempRating, settempRating] = useState(0);

  function handleRate(rate) {
    onSetRating(rate);
    setRate(rate);
  }

  const textStyle = {
    lineheight: "1",
    color,
    fontSize: `${size / 1.5}px`,
  };
  return (
    <div style={countainerStyle} className={className}>
      <div style={starCountainer}>
        {Array.from({ length: maxRaiting }, (_, i) => (
          <Star
            key={i}
            onRate={() => handleRate(i + 1)}
            full={tempRating ? tempRating >= i + 1 : rate >= i + 1}
            tempRatingEnter={() => settempRating(i + 1)}
            tempRatingLeave={() => settempRating(0)}
            color={color}
            size={size}
          />
        ))}
      </div>

      <p style={textStyle}>
        {massage.length === maxRaiting
          ? massage[tempRating ? tempRating - 1 : rate - 1]
          : tempRating || rate || ""}
      </p>
    </div>
  );
}

function Star({ onRate, full, tempRatingEnter, tempRatingLeave, color, size }) {
  const starStyle = {
    width: `${size}px`,
    height: `${size}px`,
    display: "block",
    cursor: "pointer",
    color: color,
  };
  return (
    <span
      role="button"
      style={starStyle}
      onClick={onRate}
      onMouseEnter={tempRatingEnter}
      onMouseLeave={tempRatingLeave}
    >
      {full ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill={color}
          stroke={color}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke={color}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="{2}"
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          />
        </svg>
      )}
    </span>
  );
}

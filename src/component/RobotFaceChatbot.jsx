import React, { useState, useEffect } from "react";
import "./RobotFaceChatBot.css";

// Utility hook to hide navbar/footer/layout on this page
function useHideLayout() {
  useEffect(() => {
    document.body.classList.add("hide-layout");
    return () => document.body.classList.remove("hide-layout");
  }, []);
}

export default function ChatbotFace() {
  useHideLayout();

  // Eye blinking state
  const [isBlinking, setIsBlinking] = useState(false);
  // Mouth animation state
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [mouthState, setMouthState] = useState("rest"); // 'rest' | 'open'

  // Eye blinking animation
  useEffect(() => {
  let blinkTimeout;
  let blinkInterval = setInterval(() => {
    setIsBlinking(true);
    blinkTimeout = setTimeout(() => setIsBlinking(false), 250); // slower blink duration
  }, Math.random() * 3000 + 3000); // slower blink frequency

  return () => {
    clearInterval(blinkInterval);
    clearTimeout(blinkTimeout);
  };
}, []);


  // Mouth "speaking" animation on hover
  useEffect(() => {
    let interval;
    if (isSpeaking) {
      let states = ["open", "rest"];
      let idx = 0;
      interval = setInterval(() => {
        setMouthState(states[idx % states.length]);
        idx++;
      }, 180);
    } else {
      setMouthState("rest");
    }
    return () => clearInterval(interval);
  }, [isSpeaking]);

  return (
    <div className="chatbot-bg">
      <div className="chatbot-face">
        {/* Eyes */}
        <div className={`chatbot-eye left${isBlinking ? " blink" : ""}`} />
        <div className={`chatbot-eye right${isBlinking ? " blink" : ""}`} />
        {/* SVG Mouth */}
        <svg
          className="chatbot-mouth-svg"
          viewBox="0 0 160 60"
          style={{
            position: "absolute",
            left: "50%",
            top: "62%",
            transform: "translate(-50%, 0)",
            width: "35vw", // Bigger mouth!
            minWidth: 130,
            maxWidth: 300,
            height: "10vw",
            minHeight: 45,
            maxHeight: 90,
            display: "block",
            zIndex: 2,
            cursor: "pointer",
          }}
          onMouseEnter={() => setIsSpeaking(true)}
          onMouseLeave={() => setIsSpeaking(false)}
        >
          <path
            className="chatbot-mouth-shape"
            d={
              mouthState === "rest"
                // Big, rounded, horizontal oval/rectangle (matches your image, but larger)
                ? "M35 30 Q35 15 80 15 Q125 15 125 30 Q125 45 80 45 Q35 45 35 30 Z"
                // Open mouth (taller, more oval)
                : "M35 20 Q35 5 80 5 Q125 5 125 20 Q125 55 80 55 Q35 55 35 20 Z"
            }
            fill="#fff"
            style={{
              transition: "d 0.18s cubic-bezier(.55,0,.1,1)",
            }}
          />
        </svg>
      </div>
    </div>
  );
}

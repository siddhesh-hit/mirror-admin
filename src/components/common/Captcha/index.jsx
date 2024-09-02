import React, { useEffect, useState, useRef } from "react";

const Captcha = ({ getIsCurrent }) => {
  const canvasRef = useRef(null);

  const generateOTP = () => {
    const lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
    const uppercaseLetters = lowercaseLetters.toUpperCase();
    const numbers = "0123456789";
    const characters = lowercaseLetters + uppercaseLetters + numbers;

    let otp = "";
    for (let i = 0; i < 4; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      otp += characters[randomIndex];
    }

    return otp;
  };

  const [otp, setOtp] = useState(generateOTP());
  const [userInput, setUserInput] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);

  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  const handleVerification = () => {
    setIsCorrect(otp === userInput);
  };

  const handleRefresh = () => {
    setOtp(generateOTP());
    setUserInput("");
    setIsCorrect(false);
  };

  const drawCurvedLines = (ctx, canvas) => {
    const numLines = 5;
    const lineLength = canvas.width / 4;

    for (let i = 0; i < numLines; i++) {
      const startY = Math.random() * canvas.height;
      const controlPointX = Math.random() * canvas.width;
      const controlPointY = Math.random() * canvas.height;
      const endY = Math.random() * canvas.height;

      ctx.beginPath();
      ctx.moveTo(0, startY);
      ctx.quadraticCurveTo(controlPointX, controlPointY, canvas.width, endY);
      ctx.strokeStyle = "rgba(0, 0, 0, 0.2)";
      ctx.lineWidth = 2;
      ctx.stroke();
    }
  };

  const drawOTP = (otpText) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw curved lines
    drawCurvedLines(ctx, canvas);

    // Draw strike line
    ctx.beginPath();
    ctx.moveTo(0, canvas.height / 2);
    ctx.lineTo(canvas.width, canvas.height / 2);
    ctx.strokeStyle = "rgba(0, 0, 0, 0.5)";
    ctx.stroke();

    // Add wavy lines
    for (let i = 0; i < canvas.width; i += 10) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i + 5, canvas.height);
      ctx.strokeStyle = "rgba(0, 0, 0, 0.2)";
      ctx.stroke();
    }

    // // Random rotation
    // const angle = (Math.random() * Math.PI) / 8 - Math.PI / 16;
    // ctx.rotate(angle);

    // Add text with different fonts
    const fonts = ["Arial", "Verdana", "Times New Roman", "Courier New"];
    const randomFont = fonts[Math.floor(Math.random() * fonts.length)];
    ctx.font = "bold 30px " + randomFont;
    ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
    ctx.fillText(otpText, 10, 40);

    // // Reset rotation
    // ctx.rotate(-angle);

    // Add noise
    for (let i = 0; i < 100; i++) {
      // Random positions
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;

      // Random colors
      const r = Math.floor(Math.random() * 255);
      const g = Math.floor(Math.random() * 255);
      const b = Math.floor(Math.random() * 255);

      ctx.fillStyle = `rgb(${r},${g},${b})`;

      // Random radius for noise dots
      const radius = Math.random() * 2;

      ctx.beginPath();
      ctx.arc(x, y, radius, 0, 2 * Math.PI);
      ctx.fill();
    }

    // Add blur
    ctx.filter = "blur(3px)";
    ctx.globalAlpha = 0.5;
    ctx.drawImage(canvas, 0, 0);
    ctx.globalAlpha = 1; // Reset alpha
    ctx.filter = "none"; // Reset filter
  };

  useEffect(() => {
    drawOTP(otp);
    handleVerification();
  }, [userInput]);

  useEffect(() => {
    drawOTP(otp);
  }, [handleRefresh]);

  useEffect(() => {
    getIsCurrent(isCorrect);
  }, [isCorrect]);

  return (
    <div className="captcha-container">
      {/* <p>Captcha:</p> */}
      <div className="d-flex" style={{ flexFlow: "column" }}>
        <canvas ref={canvasRef} width="500" height="50"></canvas>
        <div>
          <input
            type="text"
            value={userInput}
            onChange={handleInputChange}
            placeholder="Enter Captcha"
          />
          <span
            style={{
              cursor: "pointer",
              marginLeft: "10px",
              padding: "2px 3px",
              textAlign: "center",
              border: "1px solid black",
            }}
            onClick={handleRefresh}
          >
            <i className="fa fa-refresh" aria-hidden="true"></i>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Captcha;

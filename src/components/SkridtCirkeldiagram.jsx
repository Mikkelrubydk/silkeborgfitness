import React, { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

// Julie

const SkridtCirkeldiagram = () => {
  const [steps, setSteps] = useState(0);

  useEffect(() => {
    const randomSteps = Math.floor(Math.random() * 15000);
    setSteps(randomSteps);
  }, []);

  const percentage = Math.min((steps / 15000) * 100, 100);

  return (
    <div className="forside_box forside_skridt">
      <div className="circle-container">
        <CircularProgressbar
          value={percentage}
          className="cirkelcss"
          text={`${steps.toLocaleString()} Skridt`}
          styles={buildStyles({
            textColor: "#000",
            pathColor: "#252627",
            trailColor: "#d6d6d6a7",
            textSize: "12px",
          })}
        />
      </div>
      <div className="stats">
        <p>VÆGT: 93 kg</p>
        <p>HØJDE: 185 cm</p>
        <p>BMI: 21.5</p>
        <p>KCAL: 475</p>
      </div>
      <button className="edit-button">Ret</button>
    </div>
  );
};
export default SkridtCirkeldiagram;

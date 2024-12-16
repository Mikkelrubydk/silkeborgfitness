import Image from "next/image";
import React, { useState } from "react"; // Importer useState

// Leila

const Achievement = () => {
  const [flipped, setFlipped] = useState(null);

  const handleFlip = (index) => {
    setFlipped(index === flipped ? null : index);
  };

  // Ikoner og beskrivelser for præstationerne
  const icons = [
    "runninman.png",
    "medaljeikon.png",
    "flagikon.png",
    "benworkikon.png",
    "stjerneikon.png",
    "skubikon.png",
    "fitnessliftikon.png",
    "dumbellikon.png",
    "stormedaljeikon.png",
    "yogaikon.png",
  ];

  const descriptions = [
    "Løb i alt mere end 24 timer.",
    "Fuldfør 20 træninger.",
    "Fuldfør 40 træninger.",
    "Træn ben 100 gange.",
    "Vær med på hold træninger.",
    "Lær 20 nye øvelser.",
    "Slå din egen pr 50 gange.",
    "Løft over 300 kg.",
    "Vær top 5 i over en uge.",
    "Stræk ud efter 1000 træninger.",
  ];

  const percentages = [100, 100, 100, 62, 53, 40, 38, 33, 25, 10];

  return (
    <div className="praesentation-container">
      <section className="praesentation-leaderboard">
        <div className="praesentation-header">
          <h1 className="praesentation-title">Leaderboard</h1>
          <div className="praesentation-dropdown">
            <select>
              <option>Squats</option>
              <option>Deadlift</option>
              <option>Benchpress</option>
            </select>
          </div>
        </div>

        <p className="praesentation-description">
          Leaderboard er baseret på brugeres egne indtastninger
        </p>

        <div className="praesentation-leaderboard-grid">
          <div className="praesentation-leaderboard-second">
            <p>Omar Gaal</p>
            <div className="praesentation-score">182 kg.</div>
            <div className="praesentation-rank">2</div>
          </div>
          <div className="praesentation-leaderboard-item praesentation-leaderboard-first">
            <p>🏆 </p>
            <p>Mikkel Ruby</p>
            <div className="praesentation-score">186 kg.</div>
            <div className="praesentation-rank">1</div>
          </div>
          <div className="praesentation-leaderboard-third">
            <p>Rune Gerner</p>
            <div className="praesentation-score">167 kg.</div>
            <div className="praesentation-rank">3</div>
          </div>
        </div>

        <div className="praesentation-followers">
          <p>4. Lejla Terko 165 kg.</p>
          <p>5. Anders Flæng 160 kg.</p>
          <p>6. Julie Eskildsen 130 kg.</p>
          <p>36. Trong Nguyen 50 kg.</p>
        </div>

        <label className="praesentation-privacy">
          <input type="checkbox" />
          Gør mine data privat
          <span>
            Du og andre brugere vil ikke kunne se dig på leaderboardet
          </span>
        </label>
      </section>

      <section className="praesentation-performances">
        <h2 className="praesentation-subtitle">Mine præstationer</h2>

        <div className="praesentation-grid-container">
          <div className="praesentation-grid">
            {icons.map((icon, index) => (
              <div key={index} className="praesentation-icon-container">
                <div
                  id={`praesentation-icon-${index}`}
                  className={`praesentation-icon ${
                    (flipped === index ? "flipped" : "") +
                    (index > 3 ? " unlocked" : "")
                  }`}
                  onClick={() => handleFlip(index)}
                >
                  <div className="flip-card">
                    <div className="front-side">
                      <Image
                        src={icon}
                        alt={`icon-${index}`}
                        className="icon-image"
                      />
                      <p className="icon-percentage">{percentages[index]}%</p>
                    </div>
                    <div className="back-side">
                      <p className="flip-text">{descriptions[index]}</p>
                    </div>
                  </div>
                </div>
                <div className="corner-circle">
                  {index < 3 ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      stroke="black"
                      strokeWidth="3"
                      viewBox="0 0 24 24"
                      width="16"
                      height="16"
                    >
                      <path d="M9 16.2l-3.5-3.5-1.4 1.4 5 5 10-10-1.4-1.4L9 16.2z" />
                    </svg>
                  ) : (
                    <span style={{ fontSize: "16px", color: "black" }}>?</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Achievement;

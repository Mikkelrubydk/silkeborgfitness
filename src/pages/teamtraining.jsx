import React, { useState } from "react"; // Importer useState
import "/src/app/lejla.css";
import "/src/app/globals.css";
import Link from "next/link";

export default function TeamTraining() {
  const [isPopupBeskedOpen, setIsPopupBeskedOpen] = useState(false); // State til at styre pop-up
  const trainingData = [
    {
      day: "Mandag 29/11",
      sessions: [
        { name: "Yoga", trainer: "Murat Kilic", slots: "2/11", href: "/bookteam.jsx" },
        { name: "Pilates", trainer: "Julie Eskildsen", slots: "10/11", href: "/pilates" },
        { name: "Bike", trainer: "Leila Terko", slots: "11/11", href: "/bike" },
      ],
    },
    {
      day: "Tirsdag 30/11",
      sessions: [
        { name: "CrossFit", trainer: "Mikkel Ruby", slots: "0/11", href: "/crossfit" },
        { name: "Styrke", trainer: "Anders Flæng", slots: "1/11", href: "/styrke" },
        { name: "Spirit", trainer: "Omar Gaal", slots: "2/11", href: "/spirit" },
        { name: "Løb", trainer: "Hani Bassam", slots: "8/11", href: "/lob" },
      ],
    },
    {
      day: "Onsdag 31/11",
      sessions: [
        { name: "Yoga", trainer: "Victor Sango", slots: "2/11", href: "/yoga-2" },
      ],
    },
  ];

  // Funktion til at åbne og lukke pop-up'en
  const togglePopupBesked = () => setIsPopupBeskedOpen(!isPopupBeskedOpen);

  return (
    <main className="teamtraining-container">
      <h1 className="teamtraining-header">
        Mine bookings
        {/* Uret som knap */}
        <button onClick={togglePopupBesked} className="clock-button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            fill="none"
            stroke="var(--main-color)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="6" x2="12" y2="12" />
            <line x1="12" y1="12" x2="16" y2="12" />
          </svg>
        </button>
      </h1>

      {/* PopupBesked - vises kun når isPopupBeskedOpen er true */}
      {isPopupBeskedOpen && (
        <div className="popup-besked">
          <div className="popup-besked-content">
            <button
              onClick={togglePopupBesked}
              className="popup-besked-close-btn"
            >
              X
            </button>
            <p>Du har ikke tidligere været på et hold, derfor er der ingen aktivitet gemt.</p>
          </div>
        </div>
      )}

      <p className="teamtraining-empty">Du har ingen tilmeldte hold</p>
      {trainingData.map((dayData, index) => (
        <div key={index} className="teamtraining-day">
          <h2 className="teamtraining-day-title">{dayData.day}</h2>
          {dayData.sessions.map((session, idx) => (
            <Link key={idx} href={session.href}>
              <div className="teamtraining-session">
                <span className="teamtraining-session-name">{session.name}</span>
                <span className="teamtraining-session-trainer">
                  Træner: {session.trainer}
                </span>
                <span className="teamtraining-session-slots">
                  {session.slots} Pladser
                </span>
              </div>
            </Link>
          ))}
        </div>
      ))}
    </main>
  );
}

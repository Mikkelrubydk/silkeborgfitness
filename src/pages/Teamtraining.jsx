import React, { useState } from "react"; // Importer useState
import "/src/app/lejla.css";
import "/src/app/globals.css";
import Link from "next/link";



export default function TeamTraining() {
  const trainingData = [
    {
      day: "Mandag 29/11",
      sessions: [
        { name: "Yoga", trainer: "Murat Kilic", slots: "2/11", href: "/yoga" },
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

  return (
    <main className="teamtraining-container">
      <div className="teamtraining-header">
        <h1 className="teamtraining-title">Mine bookings</h1>
        <div className="teamtraining-clock-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="teamtraining-clock-svg"
          >
            <circle cx="12" cy="12" r="9" />
            <path d="M12 7v5l3 3" />
          </svg>
        </div>
      </div>
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

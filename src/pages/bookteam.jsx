import React, { useState } from "react";
import Image from "next/image";
import "/src/app/lejla.css";

export default function BookTeam() {
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State til popup

  // Funktion til at åbne/lukke popup
  const togglePopup = () => setIsPopupOpen(!isPopupOpen);

  return (
    <div className="bookteam-container">
      {/* Baggrundsbillede */}
      <div className="bookteam-header-image">
        <Image
          src="/yogabook.png"
          alt="Yoga session"
          layout="fill"
          objectFit="cover"
          priority={true}
        />
      </div>

      {/* BOOK-knap */}
      <button className="bookteam-button" onClick={togglePopup}>
        BOOK
      </button>

      {/* Træner og Pladser kasser */}
      <div className="bookteam-info">
        <div className="bookteam-info-box">
          <span className="bookteam-info-label">Træner</span>
          <span className="bookteam-info-value">Murat Kilic</span>
        </div>
        <div className="bookteam-info-box">
          <span className="bookteam-info-label">Pladser</span>
          <span className="bookteam-info-value">2/11</span>
        </div>
      </div>

      <div className="bookteam-details-row">
        <div className="bookteam-detail-box">
          <span className="bookteam-detail-label">Dato</span>
          <span className="bookteam-detail-value">12/12/2024</span>
        </div>
        <div className="bookteam-detail-box">
          <span className="bookteam-detail-label">Type</span>
          <span className="bookteam-detail-value">Yoga</span>
        </div>
        <div className="bookteam-detail-box">
          <span className="bookteam-detail-label">Lokale</span>
          <span className="bookteam-detail-value">Lokale 1</span>
        </div>
      </div>

      <div className="bookteam-description-box">
        <span className="bookteam-description-label">Beskrivelse:</span>
        <p className="bookteam-description-content">
          Yoga er for dig, der ønsker at forbedre din balance, styrke og
          smidighed. Passer både til begyndere og øvede.
        </p>
      </div>

      <div className="bookteam-future-times">
        <h2>Fremtidige tider</h2>
      </div>

      {/* Session-kasser */}
      <div className="bookteam-sessions">
        <div className="session-box">
          <span className="session-name">Yoga</span>
          <span className="session-trainer">Træner: Victor Sango</span>
          <span className="session-slots">2/11 Pladser</span>
        </div>
        <div className="session-box">
          <span className="session-name">Yoga</span>
          <span className="session-trainer">Træner: Murat Kilic</span>
          <span className="session-slots">2/11 Pladser</span>
        </div>
        <div className="session-box">
          <span className="session-name">Yoga</span>
          <span className="session-trainer">Træner: Murat Kilic</span>
          <span className="session-slots">2/11 Pladser</span>
        </div>
        <div className="session-box">
          <span className="session-name">Yoga</span>
          <span className="session-trainer">Træner: Murat Kilic</span>
          <span className="session-slots">2/11 Pladser</span>
        </div>
        <div className="session-box">
          <span className="session-name">Yoga</span>
          <span className="session-trainer">Træner: Murat Kilic</span>
          <span className="session-slots">2/11 Pladser</span>
        </div>
      </div>

      {/* Popup */}
      {isPopupOpen && (
        <div className="popup-besked">
          <div className="popup-besked-content">
            <button className="popup-besked-close-btn" onClick={togglePopup}>
              X
            </button>
            <p>Tak for din booking! Vi glæder os til at se dig på holdet.</p>
          </div>
        </div>
      )}
    </div>
  );
}

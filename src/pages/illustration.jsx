"use client";

// Julie

import Image from "next/image";

export default function About() {
  return (
    <div>
      {/* Benpress div */}
      <div className="tutorialpage">
        <Image src="/lpp.png" alt="Benpress billede" width={100} height={100} />
        <div className="ilu">
          Hvis du virkelig vil have noget ud af det skal..
        </div>
        {/* Grøn overlay div */}
      </div>

      {/* Grøn div med ikoner */}
      <div className="control-panel">
        <div className="slider">
          <input type="range" min="0" max="100" defaultValue="30" />
          <span>30.0</span>
        </div>
        <div className="controls">
          <button className="control-btn">◀ TILBAGE</button>
          <button className="control-btn play-btn">▶</button>
          <button className="control-btn">FREM ▶</button>
        </div>
      </div>
    </div>
  );
}

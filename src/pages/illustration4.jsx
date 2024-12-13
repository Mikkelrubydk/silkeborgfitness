import "/src/app/Julie.css";
import "/src/app/globals.css";
import Link from "next/link";

export default function About() {
  return (
    <div>
    {/* Benpress div */}
    <div className="tutorialpage">
      <img src="bpp.png" />
      <div className="ilu">Hvis du virkelig vil have noget ud af det skal..</div> {/* Grøn overlay div */}
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
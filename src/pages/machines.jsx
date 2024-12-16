import Link from "next/link";

// Julie

export default function About() {
  return (
    <div>
      {/* Benpress div */}
      <div className="benpress">
        <Link href="/illustration">
          <img src="benpress.png" alt="Benpress image" />
        </Link>
        <div className="bp"></div> {/* Grøn div nedenunder */}
        <p>Benpress</p>
      </div>

      {/* Squat div */}
      <div className="squat">
        <Link href="/illustration2">
          <img src="squat.png" alt="Squat image" />
        </Link>
        <div className="sq"></div> {/* Grøn div nedenunder */}
        <p>Squat</p>
      </div>

      {/* Pullup div */}
      <div className="pullup">
        <Link href="/illustration3">
          <img src="pullup.png" />
        </Link>
        <div className="pu"></div> {/* Grøn div nedenunder */}
        <p>Pullup</p>
      </div>

      {/* Bænkpress div */}
      <div className="benchpress">
        <Link href="/illustration4">
          <img src="benchpress.png" alt="Bænkpress image" />
        </Link>
        <div className="bp"></div> {/* Grøn div nedenunder */}
        <p>Bænkpress</p>
      </div>
    </div>
  );
}

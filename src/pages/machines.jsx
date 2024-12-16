import Image from "next/image";
import Link from "next/link";

// Julie

export default function About() {
  return (
    <div>
      {/* Benpress div */}
      <div className="benpress">
        <Link href="/illustration">
          <Image src="/benpress.png" alt="Benpress image" />
        </Link>
        <div className="bp"></div>
        <p>Benpress</p>
      </div>

      {/* Squat div */}
      <div className="squat">
        <Link href="/illustration2">
          <Image src="/squat.png" alt="Squat image" />
        </Link>
        <div className="sq"></div>
        <p>Squat</p>
      </div>

      {/* Pullup div */}
      <div className="pullup">
        <Link href="/illustration3">
          <Image src="/pullup.png" alt="pullup image" />
        </Link>
        <div className="pu"></div>
        <p>Pullup</p>
      </div>

      {/* Bænkpress div */}
      <div className="benchpress">
        <Link href="/illustration4">
          <Image src="/benchpress.png" alt="Bænkpress image" />
        </Link>
        <div className="bp"></div>
        <p>Bænkpress</p>
      </div>
    </div>
  );
}

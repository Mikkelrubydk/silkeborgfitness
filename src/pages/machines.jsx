import Image from "next/image";
import Link from "next/link"; // Importer Link fra next/link

// Julie

export default function About() {
  return (
    <div>
      {/* Benpress div */}
      <div className="benpress">
        <Link href="/illustration">
          <a>
            <Image src="./benpress.png" alt="Benpress image" />
            <div className="bp"></div>
            <p>Benpress</p>
          </a>
        </Link>
      </div>

      {/* Squat div */}
      <div className="squat">
        <Link href="/illustration2">
          <a>
            <Image src="./squat.png" alt="Squat image" />
            <div className="sq"></div>
            <p>Squat</p>
          </a>
        </Link>
      </div>

      {/* Pullup div */}
      <div className="pullup">
        <Link href="/illustration3">
          <a>
            <Image src="./pullup.png" alt="Pullup image" />
            <div className="pu"></div>
            <p>Pullup</p>
          </a>
        </Link>
      </div>

      {/* Bænkpress div */}
      <div className="benchpress">
        <Link href="/illustration4">
          <a>
            <Image src="./benchpress.png" alt="Bænkpress image" />
            <div className="bp"></div>
            <p>Bænkpress</p>
          </a>
        </Link>
      </div>
    </div>
  );
}

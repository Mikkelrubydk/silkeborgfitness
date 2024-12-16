import Image from "next/image";
import Link from "next/link"; // Importer Link fra next/link

// Julie

export default function About() {
  return (
    <div>
      {/* Benpress div */}
      <Link href="/illustration">
        <div className="benpress">
          <Image
            src="./benpress.png"
            alt="Benpress image"
            width={100}
            height={100}
          />
          <div className="bp"></div>
          <p>Benpress</p>
        </div>
      </Link>

      {/* Squat div */}
      <Link href="/illustration2">
        <div className="squat">
          <Image src="./squat.png" alt="Squat image" width={100} height={100} />
          <div className="sq"></div>
          <p>Squat</p>
        </div>
      </Link>

      {/* Pullup div */}
      <Link href="/illustration3">
        <div className="pullup">
          <Image
            src="./pullup.png"
            alt="Pullup image"
            width={100}
            height={100}
          />
          <div className="pu"></div>
          <p>Pullup</p>
        </div>
      </Link>

      {/* Bænkpress div */}
      <Link href="/illustration4">
        <div className="benchpress">
          <Image
            src="./benchpress.png"
            alt="Bænkpress image"
            width={100}
            height={100}
          />
          <div className="bp"></div>
          <p>Bænkpress</p>
        </div>
      </Link>
    </div>
  );
}

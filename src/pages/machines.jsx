import Image from "next/image";
import { useRouter } from "next/router"; // Importer useRouter

// Julie

export default function About() {
  const router = useRouter(); // Brug useRouter

  // Funktion til at navigere til en given rute
  const handleNavigation = (href) => {
    router.push(href);
  };

  return (
    <div>
      {/* Benpress div */}
      <div
        className="benpress"
        onClick={() => handleNavigation("/illustration")}
      >
        <Image src="./benpress.png" alt="Benpress image" />
        <div className="bp"></div>
        <p>Benpress</p>
      </div>

      {/* Squat div */}
      <div className="squat" onClick={() => handleNavigation("/illustration2")}>
        <Image src="./squat.png" alt="Squat image" />
        <div className="sq"></div>
        <p>Squat</p>
      </div>

      {/* Pullup div */}
      <div
        className="pullup"
        onClick={() => handleNavigation("/illustration3")}
      >
        <Image src="./pullup.png" alt="Pullup image" />
        <div className="pu"></div>
        <p>Pullup</p>
      </div>

      {/* Bænkpress div */}
      <div
        className="benchpress"
        onClick={() => handleNavigation("/illustration4")}
      >
        <Image src="./benchpress.png" alt="Bænkpress image" />
        <div className="bp"></div>
        <p>Bænkpress</p>
      </div>
    </div>
  );
}

import { db, auth } from "../lib/firebase";  // Husk at importere db og auth
import { doc, getDoc } from "firebase/firestore";  // Importer Firestore funktioner
import Link from "next/link";
import "/src/app/Julie.css";
import "/src/app/globals.css";

export default function About() {
    return (
      <div>
        {/* Benpress div */}
        <div className="benpress">
          <img src="benpress.png" alt="Benpress image" />
          <div className="bp"></div> {/* Grøn div nedenunder */}
          <p>Benpress</p>
        </div>
    
        {/* Squat div */}
        <div className="squat">
          <img src="squat.png" alt="Squat image" />
          <div className="sq"></div> {/* Grøn div nedenunder */}
          <p>Squat</p>
        </div>
  
        {/* Pullup div */}
        <div className="pullup">
          <img src="pullup.png"/>
          <div className="pu"></div> {/* Grøn div nedenunder */}
          <p>Pullup</p>
        </div>
  
        {/* Bænkpress div */}
        <div className="benchpress">
          <img src="benchpress.png" alt="Bænkpress image" />
          <div className="bp"></div> {/* Grøn div nedenunder */}
          <p>Bænkpress</p>
        </div>
      </div>
    );
  }
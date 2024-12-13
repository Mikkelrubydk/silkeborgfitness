import "/src/app/Julie.css";
import "/src/app/globals.css";

export default function Home() {
    return (
      <div className={styles.container}>
        {/* Stor billedsektion */}
        <div className={styles.imageSection}>
          <Image 
            src="/example.jpg" // Udskift med dit billede
            alt="Træningsbillede"
            layout="fill" 
            objectFit="cover"
            priority
          />
          <div className={styles.textOverlay}>
            <p>Hvis du virkelig vil have noget ud af det, skal du -</p>
          </div>
        </div>
        
        {/* Farvet div under */}
        <div className={styles.coloredDiv}>
          <p>Farvet sektion</p>
        </div>
      </div>
    );
  }
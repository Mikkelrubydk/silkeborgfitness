import { useState } from "react"; 
import { Line } from "react-chartjs-2"; 
import LogOut from "../components/logoutbtn";
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

const ProfilePage = ({ currentTheme, setTheme }) => {
  const [startWeight, setStartWeight] = useState(92);
  const [currentWeight, setCurrentWeight] = useState(90);
  const [goalWeight, setGoalWeight] = useState(85);
  const [images, setImages] = useState([]);

  // Funktion til at håndtere billede upload
  const handleImageChange = (e) => {
    const files = e.target.files;  // Multiple filer
    const newImages = [];

    // Læs hver fil og tilføj dem til state
    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.onloadend = () => {
        newImages.push(reader.result);  // Tilføj billede til liste
        if (newImages.length === files.length) {
          setImages((prevImages) => [...prevImages, ...newImages]);  // Opdater state
        }
      };
      reader.readAsDataURL(files[i]);  // Læs billedet som data-URL
    }
  };
  
  // Data til grafen
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Maj', 'Jun'], // Måned labels
    datasets: [
      {
        label: 'Aktivitetsniveau', 
        data: [21, 4, 15, 11, 12, 10], // Vægt data
        borderColor: 'rgb(255, 87, 34)', // Orange linje
        backgroundColor: 'rgba(255, 87, 34, 0.2)',
        fill: true, 
        tension: 0.1, // For en blødere kurve
        borderWidth: 5, // Gør linjen tykkere
      },
    ],
  };

  // Funktion til at håndtere vægtændring
  const handleWeightChange = (type) => {
    const newWeight = parseInt(prompt(`Indtast ny vægt for ${type} (i KG):`));
    if (!isNaN(newWeight)) {
      if (type === "Start") setStartWeight(newWeight);
      if (type === "Nuværende") setCurrentWeight(newWeight);
      if (type === "Mål") setGoalWeight(newWeight);
    } else {
      alert("Ugyldig vægt. Prøv igen.");
    }
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false, // Fjerner gridlinjerne på x-aksen
        },
        ticks: {
          color: 'white', // Gør månedslabels (ticks) hvid
          font: {
            size: 14, // Juster skriftstørrelsen
          },
        },
      },
      y: {
        grid: {
          display: false, // Fjerner gridlinjerne på y-aksen
        },
        ticks: {
          display: false, // Fjerner tallene på y-aksen til venstre
        },
      },
    },
    plugins: {
      legend: {
        display: false, // Fjerner legenden
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)', // Sætter baggrundsfarven på tooltip til sort
        titleColor: 'white', // Gør tooltip-titlerne hvide
        bodyColor: 'white', // Gør tooltip-tekst farven hvid
      },
    },
  };

  

  return (
    <main className="profilepage">
      <div className="profil-overskrift">
        <h1 className="profil-person">Mikkel Høj Ruby</h1>
      </div>
      <h2 className="overskrift1">Personlige Mål</h2>
      <div className="boks-container">
        <div className="box" onClick={() => handleWeightChange("Start")}>
          <p className="personlige-mål-overskrift">Start</p>
          <p className="personlige-mål-kg">{startWeight}KG</p>
        </div>
        <div className="box" onClick={() => handleWeightChange("Nuværende")}>
          <p className="personlige-mål-overskrift">Nuværende</p>
          <p className="personlige-mål-kg">{currentWeight}KG</p>
        </div>
        <div className="box" onClick={() => handleWeightChange("Mål")}>
          <p className="personlige-mål-overskrift">Mål</p>
          <p className="personlige-mål-kg">{goalWeight}KG</p>
        </div>
      </div>
      <p className="ret-skrift">Ret indhold ved at trykke på boksene</p>

      <div className="aktivitetsniveau">
        <div className="overskrift-container">
          <h2 className="overskrift2">Aktivitetsniveau</h2>
          <h5 className="overskrift3">2024</h5>
        </div>
        <div className="graf-container">
          <Line data={data} options={options} />
        </div>
      </div>
     
      <div className="fremskridtsdokumentation">
        <h2 className="overskrift4">Fremskridtsdokumentation</h2>
        <div className="image-box">
          {/* Render alle billeder i boksen */}
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Fremskridtsbillede ${index + 1}`}
              className="image-inside-box"
            />
          ))}
        </div>

        <div className="upload-container">
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageChange}
          id="file-input"
          className="file-input"
        />
        <label htmlFor="file-input" className="custom-file-button">
          <img src="path_to_your_image.png" alt="Vælg filer" />
        </label>
      </div>
      </div>



      <div>
        <h2 className="overskrift5">Color Theme</h2>
      </div>
      <div className="color-themes">
        <button
          style={{
            borderRadius: currentTheme === "standard" ? "50%" : "20px",
          }}
          className="standard"
          onClick={() => setTheme("standard")}
        ></button>
        <button
          style={{
            borderRadius: currentTheme === "grey" ? "50%" : "20px",
          }}
          className="grey"
          onClick={() => setTheme("grey")}
        ></button>
        <button
          style={{
            borderRadius: currentTheme === "blue" ? "50%" : "20px",
          }}
          className="blue"
          onClick={() => setTheme("blue")}
        ></button>
        <button
          style={{
            borderRadius: currentTheme === "pink" ? "50%" : "20px",
          }}
          className="pink"
          onClick={() => setTheme("pink")}
        ></button>
        <button
          style={{
            borderRadius: currentTheme === "yellow" ? "50%" : "20px",
          }}
          className="yellow"
          onClick={() => setTheme("yellow")}
        ></button>
      </div>

      <LogOut />
    </main>
  );
};

export default ProfilePage;

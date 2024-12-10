import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import LogOut from "../components/logoutbtn";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Image from "next/image";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const ProfilePage = () => {
  const [startWeight, setStartWeight] = useState(92);
  const [currentWeight, setCurrentWeight] = useState(90);
  const [goalWeight, setGoalWeight] = useState(85);
  const [images, setImages] = useState([]);
  const [uploadDates, setUploadDates] = useState([]);
  const [showAll, setShowAll] = useState(false);

  // State for storing the current theme
  const [currentTheme, setCurrentTheme] = useState("standard");

  // Check localStorage for saved theme on initial render
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setCurrentTheme(savedTheme);
    }
  }, []);

  // Update the theme and set it to localStorage
  const updateTheme = (theme) => {
    setCurrentTheme(theme);
    // Fjern eksisterende tema-klasser fra <html> elementet
    document.documentElement.classList.remove(
      "theme-blue",
      "theme-yellow",
      "theme-pink",
      "theme-grey",
      "theme-standard"
    );
    // Tilføj det ønskede tema
    document.documentElement.classList.add(`theme-${theme}`);
    // Gem temaet i localStorage
    localStorage.setItem("theme", theme);
  };

  const [data, setData] = useState({
    labels: ["Jan", "Feb", "Mar", "Apr", "Maj", "Jun"],
    datasets: [
      {
        label: "Aktivitetsniveau",
        data: [], // Initial tomt array
        borderColor: "#ffa500",
        backgroundColor: "#ffa500",
        tension: 0.2,
        borderWidth: 5,
      },
    ],
  });

  // Funktion til at generere tilfældige data
  const generateRandomData = () => {
    return Array.from({ length: 6 }, () => Math.floor(Math.random() * 31));
  };

  // useEffect til at generere tilfældige data én gang ved indlæsning
  useEffect(() => {
    const randomData = generateRandomData();
    setData((prevData) => ({
      ...prevData,
      datasets: [
        {
          ...prevData.datasets[0],
          data: randomData,
        },
      ],
    }));
  }, []);

  const handleImageChange = (e) => {
    const files = e.target.files;
    const newImages = [];
    const newDates = [];

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        newImages.push(reader.result);
        newDates.push(new Date().toLocaleDateString());
        if (newImages.length === files.length) {
          setImages((prevImages) => [...prevImages, ...newImages]);
          setUploadDates((prevDates) => [...prevDates, ...newDates]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleWeightEdit = (type, e) => {
    const newWeight = parseInt(e.target.value);
    if (!isNaN(newWeight)) {
      if (type === "Start") setStartWeight(newWeight);
      if (type === "Nuværende") setCurrentWeight(newWeight);
      if (type === "Mål") setGoalWeight(newWeight);
    }
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: "white", font: { size: 14 } },
      },
      y: {
        grid: { display: false },
        ticks: { display: false },
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        titleColor: "white",
        bodyColor: "white",
      },
    },
  };

  const handleShowAll = () => {
    setShowAll(!showAll);
  };

  return (
    <main className="profilepage">
      <div className="profil-overskrift">
        <h1 className="profil-person">Mikkel Høj Ruby</h1>
      </div>

      {/* Personlige mål */}
      <h2 className="overskrift1">Personlige Mål</h2>
      <div className="boks-container">
        <div className="box">
          <p className="personlige-mål-overskrift">Start</p>
          <input
            type="number"
            value={startWeight}
            onChange={(e) => handleWeightEdit("Start", e)}
            className="personlige-mål-kg"
          />
        </div>
        <div className="box">
          <p className="personlige-mål-overskrift">Nuværende</p>
          <input
            type="number"
            value={currentWeight}
            onChange={(e) => handleWeightEdit("Nuværende", e)}
            className="personlige-mål-kg"
          />
        </div>
        <div className="box">
          <p className="personlige-mål-overskrift">Mål</p>
          <input
            type="number"
            value={goalWeight}
            onChange={(e) => handleWeightEdit("Mål", e)}
            className="personlige-mål-kg"
          />
        </div>
      </div>

      <p className="ret-skrift">Ret indhold ved at ændre tallene</p>

      {/* Aktivitetsniveau graf */}
      <div className="aktivitetsniveau">
        <div className="overskrift-container">
          <h2 className="overskrift2">Aktivitetsniveau</h2>
          <h5 className="overskrift3">2024</h5>
        </div>
        <div className="graf-container">
          <Line data={data} options={options} />
        </div>
      </div>

      {/* Fremskridtsdokumentation */}
      <div className="fremskridtsdokumentation">
        <h2 className="overskrift4">Fremskridtsdokumentation</h2>
        <div className="image-box">
          {images.slice(0, showAll ? images.length : 3).map((image, index) => (
            <div key={index} className="image-with-date">
              <p>{uploadDates[index]}</p>
              <img
                src={image}
                alt={`Fremskridtsbillede ${index + 1}`}
                className="image-inside-box"
              />
            </div>
          ))}
        </div>
        {images.length > 3 && (
          <button className="show-all-btn" onClick={handleShowAll}>
            {showAll ? "Skjul" : "Vis alle"}
          </button>
        )}

        {/* Billedupload */}
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
            <div className="billede-boks">
              <Image
                className="plus.icon"
                src="/plus.svg"
                alt="password icon"
                width={40}
                height={40}
              />
              <p>Tilføj flere billeder</p>
            </div>
          </label>
        </div>
      </div>

      <div className="color-theme-boks">
        <h2 className="overskrift5">Color Theme</h2>
      </div>
      <div className="color-themes">
        <button
          style={{
            borderRadius: currentTheme === "standard" ? "50%" : "20px",
          }}
          className="standard"
          onClick={() => updateTheme("standard")}
        ></button>
        <button
          style={{
            borderRadius: currentTheme === "grey" ? "50%" : "20px",
          }}
          className="grey"
          onClick={() => updateTheme("grey")}
        ></button>
        <button
          style={{
            borderRadius: currentTheme === "blue" ? "50%" : "20px",
          }}
          className="blue"
          onClick={() => updateTheme("blue")}
        ></button>
        <button
          style={{
            borderRadius: currentTheme === "pink" ? "50%" : "20px",
          }}
          className="pink"
          onClick={() => updateTheme("pink")}
        ></button>
        <button
          style={{
            borderRadius: currentTheme === "yellow" ? "50%" : "20px",
          }}
          className="yellow"
          onClick={() => updateTheme("yellow")}
        ></button>
      </div>

      {/* Logout */}
      <LogOut />
    </main>
  );
};

export default ProfilePage;

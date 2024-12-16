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
import {
  getDatabase,
  ref as dbRef,
  set,
  remove,
  get,
  update,
} from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth"; // Importér getAuth

// Anders & Mikkel

const ProfilePage = () => {
  const [startWeight, setStartWeight] = useState(92);
  const [currentWeight, setCurrentWeight] = useState(90);
  const [goalWeight, setGoalWeight] = useState(85);
  const [images, setImages] = useState([]);
  const [uploadDates, setUploadDates] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [currentTheme, setCurrentTheme] = useState("standard");

  useEffect(() => {
    const auth = getAuth();
    const db = getDatabase();

    // Tjek om brugeren er logget ind
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const userId = user.uid; // Brug brugerens uid
        const userImagesRef = dbRef(db, `user_profiles/${userId}/user_images`);

        // Hent billeder fra Firebase
        get(userImagesRef)
          .then((snapshot) => {
            if (snapshot.exists()) {
              const data = snapshot.val();
              setImages(data.images || []); // Sæt billederne
              setUploadDates(data.dates || []); // Sæt upload datoer
            }
          })
          .catch((error) => {
            console.error("Fejl ved hentning af billeder:", error);
          });
      } else {
        // Hvis brugeren ikke er logget ind, rydder vi billederne
        setImages([]);
        setUploadDates([]);
      }
    });
  }, []);

  ChartJS.register(
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      y: {
        display: false,
      },
    },
  };

  const updateTheme = (theme) => {
    setCurrentTheme(theme);
    document.documentElement.classList.remove(
      "theme-blue",
      "theme-yellow",
      "theme-pink",
      "theme-grey",
      "theme-standard"
    );
    document.documentElement.classList.add(`theme-${theme}`);

    localStorage.setItem("theme", theme);
  };

  const [data, setData] = useState({
    labels: ["Jan", "Feb", "Mar", "Apr", "Maj", "Jun"],
    datasets: [
      {
        label: "",
        data: [],
        borderColor: "#ffa500",
        backgroundColor: "#ffa500",
        tension: 0.2,
        borderWidth: 5,
      },
    ],
  });

  const generateRandomData = () => {
    return Array.from({ length: 6 }, () => Math.floor(Math.random() * 31));
  };

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
    const maxSize = 2 * 1024 * 1024; // 2MB

    Array.from(files).forEach((file) => {
      if (file.size <= maxSize) {
        const reader = new FileReader();
        reader.onloadend = () => {
          newImages.push(reader.result); // base64-kodet billede
          newDates.push(new Date().toLocaleDateString());
          if (newImages.length === files.length) {
            uploadImagesToFirebase(newImages, newDates);
          }
        };
        reader.readAsDataURL(file);
      } else {
        alert("Billedet er for stort. Maksimal størrelse er 2MB.");
      }
    });
  };

  const uploadImagesToFirebase = (newImages, newDates) => {
    const auth = getAuth();
    const userid = auth.currentUser.uid;
    const db = getDatabase();
    const userImagesRef = dbRef(db, `user_profiles/${userid}/user_images`);

    setImages((prevImages) => [...prevImages, ...newImages]);
    setUploadDates((prevDates) => [...prevDates, ...newDates]);

    get(userImagesRef)
      .then((snapshot) => {
        let existingImages = [];
        let existingDates = [];

        if (snapshot.exists()) {
          const data = snapshot.val();
          existingImages = data.images || [];
          existingDates = data.dates || [];
        }

        update(userImagesRef, {
          images: [...existingImages, ...newImages],
          dates: [...existingDates, ...newDates],
        });
      })
      .catch((error) => {
        console.error("Error uploading images to Firebase:", error);
      });
  };

  const handleDeleteImage = (image, index) => {
    const auth = getAuth();
    const userid = auth.currentUser.uid;
    const db = getDatabase();
    const userImagesRef = dbRef(db, `user_profiles/${userid}/user_images`);

    // Opdater UI med det samme ved at fjerne elementet lokalt
    setImages((prevImages) => {
      const updatedImages = [...prevImages];
      updatedImages.splice(index, 1);
      return updatedImages;
    });

    setUploadDates((prevDates) => {
      const updatedDates = [...prevDates];
      updatedDates.splice(index, 1);
      return updatedDates;
    });

    // Nu kan vi opdatere Firebase efter at billederne er fjernet visuelt
    get(userImagesRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();

          const updatedImages = [...data.images];
          const updatedDates = [...data.dates];

          updatedImages.splice(index, 1);
          updatedDates.splice(index, 1);

          return update(userImagesRef, {
            images: updatedImages,
            dates: updatedDates,
          });
        }
      })
      .catch((error) => {
        console.error("Error deleting image:", error);
      });
  };

  const handleWeightEdit = (type, e) => {
    const newWeight = parseInt(e.target.value);
    if (!isNaN(newWeight)) {
      if (type === "Start") setStartWeight(newWeight);
      if (type === "Current") setCurrentWeight(newWeight);
      if (type === "Goal") setGoalWeight(newWeight);
    }
  };

  const handleShowAll = () => {
    setShowAll(!showAll);
  };
  return (
    <main className="profilepage">
      {/* Personlige mål */}
      <h2 className="overskrift1">Personlige Mål</h2>
      <div className="boks-container">
        <div className="box">
          <p className="personlige-mål-overskrift">Start</p>
          <div className="input-container">
            <input
              type="number"
              value={startWeight}
              onChange={(e) => handleWeightEdit("Start", e)}
              className="personlige-mål-kg"
            />
            <span className="kg-text">kg</span>
          </div>
        </div>
        <div className="box">
          <p className="personlige-mål-overskrift">Nuværende</p>
          <div className="input-container">
            <input
              type="number"
              value={currentWeight}
              onChange={(e) => handleWeightEdit("Nuværende", e)}
              className="personlige-mål-kg"
            />
            <span className="kg-text">kg</span>
          </div>
        </div>
        <div className="box">
          <p className="personlige-mål-overskrift">Mål</p>
          <div className="input-container">
            <input
              type="number"
              value={goalWeight}
              onChange={(e) => handleWeightEdit("Mål", e)}
              className="personlige-mål-kg"
            />
            <span className="kg-text">kg</span>
          </div>
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
        <div>
          <h2 className="overskrift4">Fremskridtsdokumentation</h2>{" "}
          <span className="show-all-btn" onClick={handleShowAll}>
            {showAll ? "Vis færre" : "Vis alle"}
          </span>
        </div>
        <div className="image-box">
          {images.slice(0, showAll ? images.length : 3).map((image, index) => (
            <div key={index} className="image-container">
              <Image
                className="image"
                src={image}
                alt={`Uploaded ${index}`}
                width={100}
                height={100}
              />
              <p>{uploadDates[index]}</p>
              <button onClick={() => handleDeleteImage(image, index)}>
                Slet
              </button>
            </div>
          ))}
        </div>
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
                className="plus-icon"
                src="./plus.svg"
                alt="Tilføj billede ikon"
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

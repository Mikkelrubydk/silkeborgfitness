import { getAuth } from "firebase/auth";
import { getDatabase, push, ref, set } from "firebase/database";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function CreateExercise() {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState(""); // Initialisér med en tom streng
  const [step, setStep] = useState(1);
  const totalSteps = 2;
  const [exerciseData, setExerciseData] = useState({
    name: "",
    category: "",
    reps: "",
    weight: "",
  });
  const database = getDatabase();
  const auth = getAuth();
  const progressWidth = (step / totalSteps) * 100;

  const categories = [
    { name: "Bryst", image: "./chest.webp" },
    { name: "Ryg", image: "./back.webp" },
    { name: "Skuldre", image: "./shoulder.webp" },
    { name: "Arme", image: "./muscle.webp" },
    { name: "Ben", image: "./leg.webp" },
    { name: "Mave", image: "./abs.webp" },
  ];

  const [activeIcon, setActiveIcon] = useState(null);

  const handleClick = (index) => {
    setActiveIcon(index);
    setExerciseData((prevData) => ({
      ...prevData,
      category: categories[index].name, // Opdaterer kategori direkte
    }));
  };

  useEffect(() => {
    if (router.query.selectedDate) {
      setSelectedDate(router.query.selectedDate);
    }
  }, [router.query.selectedDate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setExerciseData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateExerciseData = () => {
    const { name, category, reps, weight } = exerciseData;
    if (!name || !category || !reps || !weight) {
      alert("Alle felter skal udfyldes.");
      return false;
    }
    return true;
  };

  const saveExerciseToFirebase = async (exercise) => {
    const user = auth.currentUser;
    if (!user) {
      console.error("Ingen bruger er logget ind.");
      return;
    }

    try {
      const exerciseRef = ref(database, `exercises/${selectedDate}`);
      const newExerciseRef = push(exerciseRef);
      await set(newExerciseRef, { ...exercise, userId: user.uid });
      console.log("Øvelse gemt i Firebase:", exercise);
    } catch (error) {
      console.error("Fejl ved gemme øvelse i Firebase:", error);
    }
  };

  const handleSubmit = async () => {
    if (!validateExerciseData()) return;

    try {
      const updatedExerciseData = {
        ...exerciseData,
        date: selectedDate, // Brug altid den valgte dato
        userId: auth.currentUser?.uid || "",
      };

      await saveExerciseToFirebase(updatedExerciseData);
      console.log("Øvelsen er gemt:", updatedExerciseData);
    } catch (error) {
      console.error("Fejl ved oprettelse af øvelse:", error);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return ""; // Håndter tilfældet, hvor datoen ikke er defineret
    const date = new Date(dateString);
    const options = { weekday: "long", day: "2-digit", month: "long" };
    const formattedDate = date
      .toLocaleDateString("da-DK", options)
      .replace(/\b\w/g, (char) => char.toUpperCase());
    return formattedDate.replace(" ", " ").replace(" ", ". ");
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div>
            <h1 className="list-title form-title">Vælg kategori</h1>
            <div className="category-container">
              {categories.map((category, index) => (
                <div key={index}>
                  <div
                    className={`boks ${activeIcon === index ? "active" : ""}`}
                    onClick={() => handleClick(index)}
                  >
                    <img src={category.image} alt={category.name} />
                  </div>
                  <p className="undertekst">{category.name}</p>
                </div>
              ))}
            </div>
          </div>
        );
      case 2:
        return (
          <div className="workoutinfo">
            {/* Input til øvelsens navn */}
            <input
              type="text"
              name="name"
              placeholder="Navn på øvelse"
              value={exerciseData.name}
              onChange={handleInputChange}
            />

            {/* Input til antal reps */}
            <input
              type="number"
              name="reps"
              placeholder="Antal reps"
              value={exerciseData.reps}
              onChange={handleInputChange}
            />

            {/* Input til vægt */}
            <input
              type="number"
              name="weight"
              placeholder="Vægt (kg)"
              value={exerciseData.weight}
              onChange={handleInputChange}
            />

            {/* Tekstfelt til bemærkninger */}
            <textarea
              name="notes"
              placeholder="Bemærkninger"
              value={exerciseData.notes || ""}
              onChange={handleInputChange}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="create-exercise-container">
      <h2 className="list-title selecteddate">
        {formatDate(selectedDate) || "Dato ikke valgt"}
      </h2>
      <div className="progress-bar">
        <div
          className="filled"
          style={{ width: `${progressWidth}%`, transition: "width 0.5s ease" }}
        ></div>
      </div>

      {renderStep()}

      <div className="buttons">
        {step > 1 && (
          <button className="previous-btn" onClick={() => setStep(step - 1)}>
            Tilbage
          </button>
        )}
        {step < totalSteps && (
          <button className="next-btn" onClick={() => setStep(step + 1)}>
            Næste
          </button>
        )}
        {step === totalSteps && (
          <button className="submit-btn" onClick={handleSubmit}>
            Opret
          </button>
        )}
      </div>
    </div>
  );
}

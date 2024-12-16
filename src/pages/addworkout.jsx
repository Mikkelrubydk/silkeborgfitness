import { getAuth } from "firebase/auth";
import { get, getDatabase, ref, set } from "firebase/database";
import Image from "next/image";
import Link from "next/link"; // Importer Link
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

// Mikkel

export default function CreateExercise() {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState("");
  const [step, setStep] = useState(1);
  const totalSteps = 2;
  const [exerciseData, setExerciseData] = useState({
    name: "",
    category: "",
    reps: "",
    weight: "",
    notes: "",
  });
  const [activeIcon, setActiveIcon] = useState(null);
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

  useEffect(() => {
    if (router.query.selectedDate) {
      setSelectedDate(router.query.selectedDate);
    }
  }, [router.query.selectedDate]);

  const handleClick = (index) => {
    setActiveIcon(index);
    setExerciseData((prevData) => ({
      ...prevData,
      category: categories[index].name,
    }));
  };

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
    if (isNaN(reps) || isNaN(weight)) {
      alert("Reps og vægt skal være tal.");
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
      // Skab en sikker nøgle uden punktum eller ulovlige tegn
      const exerciseKey = new Date().toISOString().replace(/[.#$/\[\]]/g, "_");

      const exerciseRef = ref(
        database,
        `user_profiles/${user.uid}/exercises/${selectedDate}`
      );

      // Hent eksisterende øvelser for den valgte dato
      const snapshot = await get(exerciseRef);
      const existingExercises = snapshot.val() || {};

      // Tilføj den nye øvelse til eksisterende øvelser
      existingExercises[exerciseKey] = exercise;

      // Gem opdaterede øvelser i Firebase
      await set(exerciseRef, existingExercises);
      console.log("Øvelse gemt i Firebase:", exercise);
    } catch (error) {
      console.error("Fejl ved gemme øvelse i Firebase:", error);
    }
  };

  const handleSubmit = async () => {
    if (!validateExerciseData()) return;

    // Tjek om kategori er valgt
    if (!exerciseData.category) {
      alert("Vælg en kategori.");
      return;
    }

    try {
      const updatedExerciseData = {
        ...exerciseData,
        date: selectedDate,
        userId: auth.currentUser?.uid || "",
      };

      await saveExerciseToFirebase(updatedExerciseData);
      console.log("Øvelsen er gemt:", updatedExerciseData);
    } catch (error) {
      console.error("Fejl ved oprettelse af øvelse:", error);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const options = { weekday: "long", day: "2-digit", month: "long" };
    return date
      .toLocaleDateString("da-DK", options)
      .replace(/(^\w|\s\w)/g, (char) => char.toUpperCase());
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
                    <Image
                      src={category.image}
                      alt={category.name}
                      width={100}
                      height={100}
                    />
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
            <input
              type="text"
              name="name"
              placeholder="Navn på øvelse"
              value={exerciseData.name}
              onChange={handleInputChange}
            />
            <input
              type="number"
              name="reps"
              placeholder="Antal reps"
              value={exerciseData.reps}
              onChange={handleInputChange}
            />
            <input
              type="number"
              name="weight"
              placeholder="Vægt (kg)"
              value={exerciseData.weight}
              onChange={handleInputChange}
            />
            <textarea
              name="notes"
              placeholder="Bemærkninger"
              value={exerciseData.notes}
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
          <button
            className="next-btn"
            onClick={() => setStep(step + 1)}
            disabled={activeIcon === null} // Disable next until a category is selected
          >
            Næste
          </button>
        )}
        {step === totalSteps && (
          <Link
            href={{
              pathname: "/workouttracker",
              query: { selectedDate },
            }}
          >
            <button className="submit-btn" onClick={handleSubmit}>
              Opret
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}

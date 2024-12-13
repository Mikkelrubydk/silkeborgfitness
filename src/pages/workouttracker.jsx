import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { getDatabase, ref, onValue } from "firebase/database";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Link from "next/link";

function WorkoutTracker() {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [workouts, setWorkouts] = useState({});
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Firebase: Hent data
    const database = getDatabase();
    const exercisesRef = ref(database, "exercises");
    const unsubscribe = onValue(exercisesRef, (snapshot) => {
      const data = snapshot.val() || {};
      setWorkouts(data);
    });

    return () => unsubscribe();
  }, []);

  const generateDates = (days) => {
    const dates = [];
    const today = new Date();
    for (let i = -days; i <= days; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date.toISOString().split("T")[0]);
    }
    return dates;
  };

  const dates = generateDates(14);

  const addExercise = (exercise) => {
    const database = getDatabase();
    const exercisesRef = ref(database, `exercises/${selectedDate}`);
    const newWorkout = [...(workouts[selectedDate] || []), exercise];

    // Opdater Firebase
    exercisesRef.set(newWorkout).then(() => {
      setWorkouts((prev) => ({
        ...prev,
        [selectedDate]: newWorkout,
      }));
    });

    setShowModal(false);
  };

  return (
    <div className="workout-tracker">
      <header className="tracker-header">
        <Swiper
          spaceBetween={10}
          slidesPerView={4}
          centeredSlides
          onSlideChange={(swiper) => setSelectedDate(dates[swiper.activeIndex])}
          initialSlide={dates.indexOf(selectedDate)}
        >
          {dates.map((date, idx) => (
            <SwiperSlide key={idx}>
              <button
                onClick={() => setSelectedDate(date)}
                className={`tracker-date ${
                  date === selectedDate ? "tracker-date-active" : ""
                }`}
              >
                {`${new Date(date)
                  .toLocaleDateString("da-DK", { weekday: "long" })
                  .slice(0, 3)} ${new Date(date).toLocaleDateString("da-DK", {
                  day: "2-digit",
                  month: "2-digit",
                })}`}
              </button>
            </SwiperSlide>
          ))}
        </Swiper>
      </header>

      <WorkoutList
        selectedDate={selectedDate}
        exercises={workouts[selectedDate] || []}
      />

      <Link
        href={{
          pathname: "/addworkout",
          query: { selectedDate }, // Send korrekt dato
        }}
      >
        <button className="tracker-add-button">Tilføj øvelse</button>
      </Link>
    </div>
  );
}

function WorkoutList({ selectedDate, exercises }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { weekday: "long", day: "2-digit", month: "long" };
    const formattedDate = date
      .toLocaleDateString("da-DK", options)
      .replace(/\b\w/g, (char) => char.toUpperCase()); // Gør første bogstav stort
    return formattedDate.replace(" ", " ").replace(" ", ". ");
  };

  return (
    <div className="workout-list">
      <h2 className="list-title">{formatDate(selectedDate)}</h2>
      {exercises.length === 0 ? (
        <p>Ingen øvelser oprettet endnu.</p>
      ) : (
        <ul>
          {exercises.map((exercise, idx) => (
            <li key={idx}>
              <strong>{exercise.category}</strong>: {exercise.name} -{" "}
              {exercise.reps} reps @ {exercise.weight} kg
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default WorkoutTracker;

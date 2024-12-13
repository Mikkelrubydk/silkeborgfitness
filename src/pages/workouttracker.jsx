import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { getDatabase, ref, onValue } from "firebase/database";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Link from "next/link";
import { auth } from "@/lib/firebase";

export default function WorkoutTracker() {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [workouts, setWorkouts] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // Fetch workouts from Firebase for the selected date
  useEffect(() => {
    const database = getDatabase();
    const user = auth.currentUser;

    if (user) {
      const exercisesRef = ref(database, `user_profiles/${user.uid}/exercises`);
      const unsubscribe = onValue(exercisesRef, (snapshot) => {
        const data = snapshot.val() || {};
        const exercisesForDate = data[selectedDate]
          ? Object.values(data[selectedDate])
          : [];
        setWorkouts(exercisesForDate); // Update workouts with exercises for the selected date
      });

      return () => unsubscribe(); // Clean up on component unmount
    }
  }, [selectedDate]);

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

  const dates = generateDates(14); // Generate a date range for the slider (±14 days)

  return (
    <div className="workout-tracker">
      <header className="tracker-header">
        {/* Swiper to select the date */}
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

      {/* Pass the workouts as props to WorkoutList component */}
      <WorkoutList
        selectedDate={selectedDate}
        exercises={workouts} // Pass fetched workouts to WorkoutList
      />

      {/* Link to add a new workout */}
      <Link
        href={{
          pathname: "/addworkout",
          query: { selectedDate },
        }}
      >
        <button className="tracker-add-button">Tilføj øvelse</button>
      </Link>
    </div>
  );
}

function WorkoutList({ selectedDate, exercises }) {
  // Format date for the header
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { weekday: "long", day: "2-digit", month: "long" };
    const formattedDate = date
      .toLocaleDateString("da-DK", options)
      .replace(/\b\w/g, (char) => char.toUpperCase());
    return formattedDate.replace(" ", " ").replace(" ", ". ");
  };

  return (
    <div className="workout-list">
      <h2 className="list-title">{formatDate(selectedDate)}</h2>
      {exercises.length === 0 ? (
        <p>Ingen øvelser oprettet endnu.</p>
      ) : (
        <div className="exercise-container">
          {exercises.map((exercise, idx) => (
            <div key={idx} className="exercise-card">
              <div className="exercise-header">
                <strong>{exercise.category || "Ukategoriseret"}</strong>
                <span className="exercise-name">
                  {exercise.name || "Ukendt øvelse"}
                </span>
              </div>
              <div className="exercise-details">
                <p>{exercise.reps} Reps</p>
                <p>{exercise.weight}Kg</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

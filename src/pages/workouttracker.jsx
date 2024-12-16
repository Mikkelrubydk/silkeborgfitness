import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { getDatabase, ref, onValue } from "firebase/database";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { auth } from "@/lib/firebase";
import Image from "next/image";
import Link from "next/link"; // Importer Link-komponenten

export default function WorkoutTracker() {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [workouts, setWorkouts] = useState([]);

  // Hent øvelser fra Firebase for den valgte dato
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
        setWorkouts(exercisesForDate); // Opdater workouts med øvelser for den valgte dato
      });

      return () => unsubscribe(); // Ryd op ved komponentens afmontering
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

  const dates = generateDates(14); // Generer et datointerval for swiper (±14 dage)

  return (
    <div className="workout-tracker">
      <header className="tracker-header">
        {/* Swiper til at vælge dato */}
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

      {/* Pass workouts som props til WorkoutList komponenten */}
      <WorkoutList
        selectedDate={selectedDate}
        exercises={workouts} // Passer de hentede øvelser til WorkoutList
      />

      {/* Link til at tilføje en ny øvelse */}
      <Link href={{ pathname: "/addworkout", query: { selectedDate } }}>
        <button className="tracker-add-button">Tilføj øvelse</button>
      </Link>
    </div>
  );
}

function WorkoutList({ selectedDate, exercises }) {
  // Henter datoen valgt i SwiperSlide og konverterer den til korrekt format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { weekday: "long", day: "2-digit", month: "long" };
    let formattedDate = date
      .toLocaleDateString("da-DK", options)
      .replace(/\b\w/g, (char) => char.toUpperCase());

    const dayOfWeek = formattedDate.split(" ")[0];
    formattedDate = formattedDate.replace(
      dayOfWeek,
      dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1).toLowerCase()
    );

    return formattedDate;
  };

  return (
    <div className="workout-list">
      <h2 className="list-title">{formatDate(selectedDate)}</h2>
      {exercises.length === 0 ? (
        <p>Ingen øvelser oprettet endnu.</p>
      ) : (
        <div className="exercise-container">
          {exercises.map((exercise, idx) => {
            // Dynamisk valg af billede baseret på øvelseskategori
            let categoryImage;
            switch (exercise.category) {
              case "Arme":
                categoryImage = "/armworkout.webp";
                break;
              case "Bryst":
                categoryImage = "/chestworkout.webp";
                break;
              case "Ryg":
                categoryImage = "/backworkout.webp";
                break;
              case "Skuldre":
                categoryImage = "/shoulderworkout.webp";
                break;
              case "Ben":
                categoryImage = "/legworkout.webp";
                break;
              case "Mave":
                categoryImage = "/absworkout.webp";
                break;
            }

            return (
              <div key={idx} className="exercise-card">
                <div className="exercise-header">
                  <Image
                    className="exercise-image"
                    src={categoryImage}
                    alt={`${exercise.category} øvelse`}
                    width={100}
                    height={100}
                  />
                </div>
                <div className="exercise-body">
                  <p>{exercise.reps} Reps</p>
                  <p>{exercise.weight}kg</p>
                </div>

                <div className="exercise-footer">
                  <h2>{exercise.name || "Ukendt øvelse"} </h2>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

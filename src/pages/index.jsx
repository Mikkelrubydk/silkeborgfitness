import { useEffect, useState } from "react";
import { db, auth } from "../lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import SkridtCirkeldiagram from "../components/SkridtCirkeldiagram";
import Link from "next/link";
import Image from "next/image";

// Julie

export default function Home() {
  const [theme, setTheme] = useState("standard");
  const [selectedDay, setSelectedDay] = useState("");
  const [chartData, setChartData] = useState([]);

  // Data for hver dag
  const data = {
    Mandag: [15, 20, 30, 40, 50, 60, 70, 75, 70, 60, 50, 40, 30, 20, 10],
    Tirsdag: [10, 15, 25, 35, 45, 55, 65, 70, 65, 55, 45, 35, 25, 15, 10],
    Onsdag: [15, 20, 30, 45, 55, 65, 75, 80, 75, 65, 55, 45, 35, 20, 10],
    Torsdag: [10, 15, 25, 40, 50, 60, 70, 75, 70, 60, 50, 40, 30, 15, 10],
    Fredag: [5, 10, 20, 35, 50, 65, 75, 70, 60, 45, 30, 20, 10, 5, 5],
    Lørdag: [5, 10, 15, 25, 40, 55, 65, 60, 50, 40, 30, 20, 10, 5, 5],
    Søndag: [10, 15, 20, 30, 45, 55, 65, 60, 50, 40, 30, 20, 15, 10, 5],
  };

  // Hent data for den aktuelle dag
  const getCurrentDayData = () => {
    const days = [
      "Søndag",
      "Mandag",
      "Tirsdag",
      "Onsdag",
      "Torsdag",
      "Fredag",
      "Lørdag",
    ];
    const currentDay = new Date().getDay(); // Henter dagens nummer (0 = Søndag, 1 = Mandag osv.)
    const currentDayName = days[currentDay]; // Får dagens navn ud fra arrayet
    return currentDayName;
  };

  // Opdaterer chartData, når komponenten først loades
  useEffect(() => {
    const currentDayName = getCurrentDayData(); // Hent dagens navn
    setSelectedDay(currentDayName); // Sæt selectedDay til dagens navn
    setChartData(data[currentDayName] || []); // Indsætter dagens data i chartData
  }, [data]); // Denne useEffect kører kun én gang, når komponenten loades

  // Hent og opdater tema fra localStorage eller Firebase
  useEffect(() => {
    const fetchTheme = async () => {
      const storedTheme = localStorage.getItem("theme");
      if (storedTheme) {
        setTheme(storedTheme);
      } else {
        const userId = auth.currentUser?.uid;
        if (userId) {
          try {
            const userDoc = await getDoc(doc(db, "user_profiles", userId));
            if (userDoc.exists()) {
              const firestoreTheme = userDoc.data().colortheme;
              setTheme(firestoreTheme || "standard");
            } else {
              setTheme("standard");
            }
          } catch (error) {
            console.error("Fejl ved at hente tema fra Firebase:", error);
          }
        }
      }
    };

    fetchTheme();
  }, []);

  // Opdaterer tema på dokumentets root element
  useEffect(() => {
    document.documentElement.classList.remove(
      "theme-blue",
      "theme-yellow",
      "theme-pink",
      "theme-grey",
      "theme-standard"
    );
    document.documentElement.classList.add(`theme-${theme}`);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Håndterer ændring af dag i dropdown
  const handleDayChange = (e) => {
    const selected = e.target.value;
    setSelectedDay(selected); // Opdaterer valgt dag
    setChartData(data[selected] || []); // Opdaterer chartData baseret på valgt dag
  };

  return (
    <main>
      <div className="forside_container">
        <Link href="/workouttracker">
          <div className="forside_box forside_logbog">
            <div className="top-left">Logbog</div>
            <div className="center">
              <Image src="dumbbell.svg" alt="Logbog Billede" />
            </div>
            <div className="bottom-left">Sidst noteret: 29/11</div>
          </div>
        </Link>

        <div className="forside_box forside_skridt">
          <SkridtCirkeldiagram />
        </div>

        <Link href="/achievement">
          <div className="forside_box forside_praestationer">
            <div className="top-left">Præstationer</div>
            <div className="center">
              <Image src="medal.svg" alt="Præstationer Billede" />
            </div>
            <div className="bottom-left">Ny præmie låst op!</div>
          </div>
          <div className="alert-icon"></div>
        </Link>

        <div className="forside_box forside_graf">
          <h2>Oversigt over travlhed</h2>
          <p className="pas">
            <select onChange={handleDayChange} value={selectedDay}>
              {Object.keys(data).map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>
          </p>
          <div className="chart">
            {chartData.map((height, index) => (
              <div
                key={index}
                className="bar"
                style={{ height: `${height}%` }}
              ></div>
            ))}
          </div>
          <div className="labels">
            <span>9</span>
            <span>10</span>
            <span>11</span>
            <span>12</span>
            <span>13</span>
            <span>14</span>
            <span>15</span>
            <span>16</span>
            <span>17</span>
            <span>18</span>
            <span>19</span>
            <span>20</span>
            <span>21</span>
            <span>22</span>
            <span>23</span>
          </div>
        </div>

        <Link href="/machines">
          <div className="forside_box forside_tutorials">
            <div className="top-left">Illustrationer</div>
            <div className="center">
              <Image src="video.svg" alt="Tutorials Billede" />
            </div>
          </div>
        </Link>

        <Link href="/teamtraining">
          <div className="forside_box forside_ekstra">
            <div className="top-left">Holdtræning</div>
            <div className="center">
              <Image src="hold.png" alt="Hold Billede" />
            </div>
          </div>
        </Link>
      </div>
    </main>
  );
}

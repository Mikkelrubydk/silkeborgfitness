import { useEffect, useState } from "react";
import { db, auth } from "../lib/firebase"; // Husk at importere db og auth
import { doc, getDoc } from "firebase/firestore"; // Importer Firestore funktioner
import SkridtCirkeldiagram from "../components/SkridtCirkeldiagram"; // Import af komponenten
import Link from "next/link";

export default function Home() {
  const [theme, setTheme] = useState("standard");

  const [selectedDay, setSelectedDay] = useState("Mandag 30/10");
  const [chartData, setChartData] = useState([
    20, 40, 30, 10, 15, 60, 75, 70, 80, 50, 40, 30,
  ]);

  // Dummy data for forskellige dage
  const data = {
    "Mandag 30/10": [20, 40, 30, 10, 15, 60, 75, 70, 80, 50, 40, 30],
    "Tirsdag 31/10": [10, 20, 40, 30, 50, 60, 40, 20, 30, 40, 50, 60],
    "Onsdag 1/11": [15, 35, 55, 25, 45, 60, 50, 40, 30, 40, 50, 65],
    "Torsdag 2/11": [25, 50, 40, 30, 40, 45, 65, 60, 50, 30, 40, 55],
  };

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

  const handleDayChange = (event) => {
    setSelectedDay(event.target.value);
    setChartData(data[event.target.value]); // Opdater grafdata baseret på valgt dag
  };

  return (
    <main>
      <div className="forside_container">
        <Link href="/workouttracker">
          <div className="forside_box forside_logbog">
            <div className="top-left">Logbog</div>
            <div className="center">
              <img src="dumbbell.svg" alt="Logbog Billede" />
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
              <img src="medal.svg" alt="Præstationer Billede" />
            </div>
            <div className="bottom-left">Ny præmie låst op!</div>
          </div>
          <div className="alert-icon"></div>
        </Link>

        <div className="forside_box forside_graf">
          <h2>Oversigt over travlhed</h2>
          <p>
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

        <div className="forside_box forside_tutorials">
          <div className="top-left">Tutorials</div>
          <div className="center">
            <img src="video.svg" alt="Tutorials Billede" />
          </div>
        </div>

        <div className="forside_box forside_ekstra">
          <div className="top-left">Holdtræning</div>
          <div className="center">
            <img src="hold.png" alt="Hold Billede" />
          </div>
        </div>
      </div>
    </main>
  );
}

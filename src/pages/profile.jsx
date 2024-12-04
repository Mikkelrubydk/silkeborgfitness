import { useState, useEffect } from "react";
import LogOut from "../components/logoutbtn";

const ProfilePage = () => {
  const [theme, setTheme] = useState("standard");

  // Funktion til at ændre tema
  const changeTheme = (theme) => {
    // Fjern alle eksisterende tema-klasser
    document.documentElement.classList.remove(
      "theme-blue",
      "theme-yellow",
      "theme-pink",
      "theme-grey",
      "theme-standard"
    );

    // Tilføj den valgte tema-klasse
    document.documentElement.classList.add(`theme-${theme}`);

    // Gem tema-valget i localStorage
    localStorage.setItem("theme", theme);
  };

  // Læs temaet fra localStorage og anvend det
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setTheme(storedTheme);
    } else {
      setTheme("standard");
    }
  }, []);

  // Opdater temaet, når `theme` ændres
  useEffect(() => {
    changeTheme(theme);
    console.log(`farvetemaet er ændret til: ${theme}`);
  }, [theme]);

  return (
    <main className="profilepage">
      <div className="profil-overskrift">
        <h2 className="profil-person">Mikkel Høj Ruby</h2>
      </div>

      <div className="color-themes">
        <button
          style={{
            borderRadius: theme === "standard" ? "50%" : "20px",
          }}
          className="standard"
          onClick={() => setTheme("standard")}
        ></button>
        <button
          style={{
            borderRadius: theme === "grey" ? "50%" : "20px",
          }}
          className="grey"
          onClick={() => setTheme("grey")}
        ></button>
        <button
          style={{
            borderRadius: theme === "blue" ? "50%" : "20px",
          }}
          className="blue"
          onClick={() => setTheme("blue")}
        ></button>
        <button
          style={{
            borderRadius: theme === "pink" ? "50%" : "20px",
          }}
          className="pink"
          onClick={() => setTheme("pink")}
        ></button>
        <button
          style={{
            borderRadius: theme === "yellow" ? "50%" : "20px",
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

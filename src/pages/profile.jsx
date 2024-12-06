import LogOut from "../components/logoutbtn";

const ProfilePage = () => {
  const [theme, setTheme] = useState("standard");
  const [startWeight, setStartWeight] = useState(92);
  const [currentWeight, setCurrentWeight] = useState(90);
  const [goalWeight, setGoalWeight] = useState(85);

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
    console.log(`Farvetemaet er ændret til: ${theme}`);
  }, [theme]);

  // Funktion til at håndtere vægtændring
  const handleWeightChange = (type) => {
    const newWeight = parseInt(prompt(`Indtast ny vægt for ${type} (i KG):`));
    if (!isNaN(newWeight)) {
      if (type === "Start") setStartWeight(newWeight);
      if (type === "Nuværende") setCurrentWeight(newWeight);
      if (type === "Mål") setGoalWeight(newWeight);
    } else {
      alert("Ugyldig vægt. Prøv igen.");
    }
  };

  return (
    <main className="profilepage">
      <div className="profil-overskrift">
        <h1 className="profil-person">Mikkel Høj Ruby</h1>
      </div>
      <h2 className="overskrift1">Personlige Mål</h2>
      <div className="boks-container">
        <div className="box" onClick={() => handleWeightChange("Start")}>
          <p className="personlige-mål-overskrift">Start</p>
          <p className="personlige-mål-kg">{startWeight}KG</p>
        </div>
        <div className="box" onClick={() => handleWeightChange("Nuværende")}>
          <p className="personlige-mål-overskrift">Nuværende</p>
          <p className="personlige-mål-kg">{currentWeight}KG</p>
        </div>
        <div className="box" onClick={() => handleWeightChange("Mål")}>
          <p className="personlige-mål-overskrift">Mål</p>
          <p className="personlige-mål-kg">{goalWeight}KG</p>
        </div>
        <p className="ret-skrift">Ret indhold ved at trykke på boksene</p>
      </div>

      <div>
        <h2 className="overskrift2">Aktivitetsniveau</h2>
      </div>

      <div className="color-themes">
        <button
          style={{
            borderRadius: currentTheme === "standard" ? "50%" : "20px",
          }}
          className="standard"
          onClick={() => setTheme("standard")}
        ></button>
        <button
          style={{
            borderRadius: currentTheme === "grey" ? "50%" : "20px",
          }}
          className="grey"
          onClick={() => setTheme("grey")}
        ></button>
        <button
          style={{
            borderRadius: currentTheme === "blue" ? "50%" : "20px",
          }}
          className="blue"
          onClick={() => setTheme("blue")}
        ></button>
        <button
          style={{
            borderRadius: currentTheme === "pink" ? "50%" : "20px",
          }}
          className="pink"
          onClick={() => setTheme("pink")}
        ></button>
        <button
          style={{
            borderRadius: currentTheme === "yellow" ? "50%" : "20px",
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

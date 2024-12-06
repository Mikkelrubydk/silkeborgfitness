import LogOut from "../components/logoutbtn";

const ProfilePage = ({ setTheme, currentTheme }) => {
  return (
    <main className="profilepage">
      <div className="profil-overskrift">
        <h2 className="profil-person">Mikkel Høj Ruby</h2>
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

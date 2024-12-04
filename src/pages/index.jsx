import '/src/app/Julie.css';
import '/src/app/globals.css';

export default function Home() {
  return (
    <>
<div className="forside_container">
      {/* Øverste række */}
      <div className="forside_box forside_logbog">
  <div className="top-left">Logbog</div>
  <div className="center">
    <img src="dumbbell.png" alt="Logbog Billede" />
  </div>
  <div className="bottom-left">Sidst noteret: 29/11</div>
</div>


      <div className="forside_box forside_skridt">11,238 Skridt</div>

      {/* Midterste række */}
      <div className="forside_box forside_praestationer">
  <div className="top-left">Præstationer</div>
  <div className="center">
    <img src="medal.png" alt="Præstationer Billede" />
  </div>
  <div className="bottom-left">Ny præmie låst op!</div>
</div>


      <div className="forside_box forside_graf">Oversigt over travlhed</div>

      {/* Nederste række */}
      <div className="forside_box forside_tutorials">
  <div className="top-left">Tutorials</div>
  <div className="center">
    <img src="video.png" alt="Tutorials Billede" />
  </div>
</div>


      <div className="forside_box forside_fremskridt">Fremskridt</div>
    </div>
    </>
  );
}

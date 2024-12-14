import { auth, database } from "../../lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, set } from "firebase/database";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, password, name } = req.body;

    // Tjek for at sikre, at alle felter er udfyldt
    if (!email || !password || !name) {
      return res.status(400).json({ error: "Alle felter skal udfyldes" });
    }

    try {
      // Opret bruger med email og adgangskode
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Gem brugerens data i Realtime Database under UID
      await set(ref(database, `users/${user.uid}`), {
        name,
        email,
      });

      // Returner successtatus med brugerdata
      res
        .status(200)
        .json({
          message: "Bruger oprettet!",
          user: { uid: user.uid, name, email },
        });
    } catch (error) {
      // Håndter fejl og returner fejlmeddelelse
      res.status(400).json({ error: error.message });
    }
  } else {
    // Hvis ikke en POST-anmodning, returner 405-method not allowed
    res.status(405).json({ message: "Kun POST-metode understøttes" });
  }
}

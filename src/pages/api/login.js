import { auth } from "../../lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).end();
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      res.status(200).end();
    } catch (error) {
      res.status(400).end();
    }
  } else {
    res.status(405).end();
  }
}

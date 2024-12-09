"use client";

export default function Error({ error, reset }) {
  return (
    <div>
      <h2>Der opstod en fejl!</h2>
      <p>{error.message}</p>
      <button onClick={() => reset()}>Prøv igen</button>
    </div>
  );
}

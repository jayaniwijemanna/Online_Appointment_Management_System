import { useEffect, useState } from "react";

export default function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        setError("");
       const res = await fetch("/api/doctors");
        if (!res.ok) throw new Error("HTTP " + res.status);
        const data = await res.json();
        setDoctors(data);
      } catch (e) {
        console.error("Doctors fetch error:", e);
        setError("Failed to fetch");
      }
    };
    load();
  }, []);

  return (
    <div className="section">
      <h2>Doctors</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {!error && doctors.length === 0 ? (
        <p>Loading... (or no doctors)</p>
      ) : (
        <ul>
          {doctors.map((d) => (
            <li key={d.id}>
              <b>{d.name}</b> — {d.specialization} — {d.email}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

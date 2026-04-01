import { useEffect, useState } from "react";

function Patients() {
  const [patients, setPatients] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    fetch("/api/patients")
      .then(res => res.json())
      .then(data => setPatients(data));
  }, []);

  const addPatient = () => {
    fetch("/api/patients", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email })
    })
      .then(res => res.json())
      .then(newPatient => {
        setPatients([...patients, newPatient]);
        setName("");
        setEmail("");
      });
  };

  return (
    <div>
      <h2>Patients</h2>

      <input
        placeholder="Name"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <input
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <button onClick={addPatient}>Add Patient</button>

      <ul>
        {patients.map(p => (
          <li key={p.id}>{p.name} - {p.email}</li>
        ))}
      </ul>
    </div>
  );
}

export default Patients;

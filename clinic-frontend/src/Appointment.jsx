import { useEffect, useState } from "react";

export default function Appointment() {
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);

  const [doctorId, setDoctorId] = useState("");
  const [patientId, setPatientId] = useState("");
  const [date, setDate] = useState("");     // yyyy-mm-dd
  const [time, setTime] = useState("");     // e.g. 09:30 AM
  const [status, setStatus] = useState("BOOKED");

  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const loadAll = async () => {
    try {
      setError("");
      const [aRes, dRes, pRes] = await Promise.all([
        fetch("/api/appointments"),
        fetch("/api/doctors"),
        fetch("/api/patients"),
      ]);

      if (!aRes.ok) throw new Error("Appointments load failed");
      if (!dRes.ok) throw new Error("Doctors load failed");
      if (!pRes.ok) throw new Error("Patients load failed");

      const [a, d, p] = await Promise.all([aRes.json(), dRes.json(), pRes.json()]);
      setAppointments(a);
      setDoctors(d);
      setPatients(p);
    } catch (e) {
      setError(e.message || "Something went wrong");
    }
  };

  useEffect(() => {
    loadAll();
  }, []);

  const addAppointment = async () => {
    try {
      setMsg("");
      setError("");

      if (!doctorId || !patientId || !date || !time) {
        setError("Please fill Doctor, Patient, Date, Time");
        return;
      }

      const payload = {
        doctorId: Number(doctorId),
        patientId: Number(patientId),
        date,
        time,
        status,
      };

      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error("API failed: " + res.status + " " + text);
      }

      const saved = await res.json();
      setAppointments((prev) => [...prev, saved]);

      setDoctorId("");
      setPatientId("");
      setDate("");
      setTime("");
      setStatus("BOOKED");
      setMsg("✅ Appointment booked!");
    } catch (e) {
      setError(e.message || "Failed");
    }
  };

  return (
    <div style={styles.card}>
      <h2 style={styles.h2}>Appointments</h2>

      <div style={styles.formRow}>
        <select style={styles.input} value={doctorId} onChange={(e) => setDoctorId(e.target.value)}>
          <option value="">Select Doctor</option>
          {doctors.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name} {d.specialization ? `— ${d.specialization}` : ""}
            </option>
          ))}
        </select>

        <select style={styles.input} value={patientId} onChange={(e) => setPatientId(e.target.value)}>
          <option value="">Select Patient</option>
          {patients.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name} {p.email ? `— ${p.email}` : ""}
            </option>
          ))}
        </select>

        <input
          style={styles.input}
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <input
          style={styles.input}
          placeholder="Time (e.g. 09:30 AM)"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />

        <select style={styles.input} value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="BOOKED">BOOKED</option>
          <option value="CANCELLED">CANCELLED</option>
          <option value="COMPLETED">COMPLETED</option>
        </select>

        <button style={styles.btn} onClick={addAppointment}>Book</button>
      </div>

      {msg && <p style={{ color: "#8cff8c", marginTop: 10 }}>{msg}</p>}
      {error && <p style={{ color: "#ff6b6b", marginTop: 10 }}>{error}</p>}

      <div style={{ marginTop: 16 }}>
        <button style={styles.btnSmall} onClick={loadAll}>Refresh</button>
      </div>

      <ul style={styles.list}>
        {appointments.map((a) => (
          <li key={a.id} style={styles.listItem}>
            <b>#{a.id}</b> — {a.date} — {a.time} — <span style={styles.badge}>{a.status}</span>
            <div style={styles.mini}>
              Doctor ID: {a.doctorId ?? a.doctor_id ?? a.doctor?.id} | Patient ID: {a.patientId ?? a.patient_id ?? a.patient?.id}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

const styles = {
  card: {
    marginTop: 18,
    padding: 18,
    borderRadius: 14,
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.08)",
  },
  h2: { margin: 0, marginBottom: 12 },
  formRow: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 160px 180px 140px 120px",
    gap: 10,
    alignItems: "center",
  },
  input: {
    padding: "10px 12px",
    borderRadius: 10,
    border: "1px solid rgba(255,255,255,0.15)",
    background: "rgba(0,0,0,0.25)",
    color: "white",
    outline: "none",
  },
  btn: {
    padding: "10px 14px",
    borderRadius: 10,
    border: "none",
    cursor: "pointer",
    fontWeight: 700,
  },
  btnSmall: {
    padding: "8px 12px",
    borderRadius: 10,
    border: "none",
    cursor: "pointer",
    fontWeight: 700,
  },
  list: { marginTop: 14, paddingLeft: 18 },
  listItem: { marginBottom: 10 },
  badge: {
    padding: "2px 8px",
    borderRadius: 999,
    border: "1px solid rgba(255,255,255,0.2)",
  },
  mini: { opacity: 0.8, fontSize: 12, marginTop: 4 },
};

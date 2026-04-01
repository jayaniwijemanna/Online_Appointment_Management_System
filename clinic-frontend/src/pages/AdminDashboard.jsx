import { useEffect, useMemo, useState } from "react";

function Card({ title, right, children }) {
  return (
    <div className="card">
      <div className="cardHead">
        <div>
          <div className="cardTitle">{title}</div>
          <div className="cardSub">Create • Read • Update • Delete</div>
        </div>
        {right}
      </div>
      <div className="cardBody">{children}</div>
    </div>
  );
}

function Toast({ kind, text }) {
  if (!text) return null;
  return <div className={`toast ${kind}`}>{text}</div>;
}

export default function AdminDashboard() {
  const [tab, setTab] = useState("doctors");

  return (
    <div className="container">
      <div className="pageHead">
        <div>
          <h1 className="h1">Admin Dashboard</h1>
          <p className="p">Manage Doctors, Patients, and Appointments from one place.</p>
        </div>

        <div className="seg">
          <button className={tab === "doctors" ? "segBtn active" : "segBtn"} onClick={() => setTab("doctors")}>
            Doctors
          </button>
          <button className={tab === "patients" ? "segBtn active" : "segBtn"} onClick={() => setTab("patients")}>
            Patients
          </button>
          <button className={tab === "appointments" ? "segBtn active" : "segBtn"} onClick={() => setTab("appointments")}>
            Appointments
          </button>
        </div>
      </div>

      {tab === "doctors" && <DoctorsCRUD />}
      {tab === "patients" && <PatientsCRUD />}
      {tab === "appointments" && <AppointmentsCRUD />}
    </div>
  );
}

/* -------------------- Doctors -------------------- */
function DoctorsCRUD() {
  const [items, setItems] = useState([]);
  const [ok, setOk] = useState("");
  const [err, setErr] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [name, setName] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const reset = () => {
    setEditingId(null);
    setName("");
    setSpecialization("");
    setPhone("");
    setEmail("");
  };

  const load = async () => {
    try {
      setErr(""); setOk("");
      const res = await fetch("/api/doctors");
      if (!res.ok) throw new Error("HTTP " + res.status);
      const data = await res.json();
      setItems(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
      setErr("Failed to load doctors");
    }
  };

  useEffect(() => { load(); }, []);

  const onEdit = (d) => {
    setEditingId(d.id);
    setName(d.name ?? "");
    setSpecialization(d.specialization ?? "");
    setPhone(d.phone ?? "");
    setEmail(d.email ?? "");
  };

  const onDelete = async (id) => {
    if (!confirm("Delete this doctor?")) return;
    try {
      setErr(""); setOk("");
      const res = await fetch(`/api/doctors/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("HTTP " + res.status);
      setOk("Doctor deleted ✅");
      load();
    } catch (e) {
      console.error(e);
      setErr("Delete failed ❌");
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setErr(""); setOk("");
      const payload = { name, specialization, phone, email };

      const isEdit = editingId != null;
      const url = isEdit ? `/api/doctors/${editingId}` : "/api/doctors";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("HTTP " + res.status);
      setOk(isEdit ? "Doctor updated ✅" : "Doctor created ✅");
      reset();
      load();
    } catch (e) {
      console.error(e);
      setErr("Save failed ❌");
    }
  };

  return (
    <div className="grid2">
      <Card
        title="Doctors"
        right={<button className="btn ghost" onClick={load}>Refresh</button>}
      >
        <div className="tableWrap">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Specialization</th>
                <th>Email</th>
                <th>Phone</th>
                <th style={{ width: 170 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((d) => (
                <tr key={d.id}>
                  <td>{d.name}</td>
                  <td>{d.specialization}</td>
                  <td>{d.email}</td>
                  <td>{d.phone}</td>
                  <td>
                    <div className="row">
                      <button className="btn small" onClick={() => onEdit(d)}>Edit</button>
                      <button className="btn small danger" onClick={() => onDelete(d.id)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
              {items.length === 0 && (
                <tr><td colSpan="5" className="muted">No doctors found</td></tr>
              )}
            </tbody>
          </table>
        </div>

        <Toast kind="ok" text={ok} />
        <Toast kind="err" text={err} />
      </Card>

      <Card title={editingId ? "Edit Doctor" : "Add Doctor"} right={<button className="btn ghost" onClick={reset}>Clear</button>}>
        <form onSubmit={onSubmit} className="form">
          <div className="formGrid">
            <div>
              <label>Name</label>
              <input className="input" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>

            <div>
              <label>Specialization</label>
              <input className="input" value={specialization} onChange={(e) => setSpecialization(e.target.value)} required />
            </div>

            <div>
              <label>Email</label>
              <input className="input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>

            <div>
              <label>Phone</label>
              <input className="input" value={phone} onChange={(e) => setPhone(e.target.value)} required />
            </div>
          </div>

          <div className="row">
            <button className="btn primary" type="submit">{editingId ? "Update" : "Create"}</button>
            <button className="btn" type="button" onClick={reset}>Cancel</button>
          </div>
        </form>
      </Card>
    </div>
  );
}

/* -------------------- Patients -------------------- */
function PatientsCRUD() {
  const [items, setItems] = useState([]);
  const [ok, setOk] = useState("");
  const [err, setErr] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const reset = () => {
    setEditingId(null);
    setName("");
    setAge("");
    setPhone("");
    setEmail("");
  };

  const load = async () => {
    try {
      setErr(""); setOk("");
      const res = await fetch("/api/patients");
      if (!res.ok) throw new Error("HTTP " + res.status);
      const data = await res.json();
      setItems(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
      setErr("Failed to load patients");
    }
  };

  useEffect(() => { load(); }, []);

  const onEdit = (p) => {
    setEditingId(p.id);
    setName(p.name ?? "");
    setAge(p.age ?? "");
    setPhone(p.phone ?? "");
    setEmail(p.email ?? "");
  };

  const onDelete = async (id) => {
    if (!confirm("Delete this patient?")) return;
    try {
      setErr(""); setOk("");
      const res = await fetch(`/api/patients/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("HTTP " + res.status);
      setOk("Patient deleted ✅");
      load();
    } catch (e) {
      console.error(e);
      setErr("Delete failed ❌");
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setErr(""); setOk("");
      const payload = { name, age: age === "" ? null : Number(age), phone, email };

      const isEdit = editingId != null;
      const url = isEdit ? `/api/patients/${editingId}` : "/api/patients";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("HTTP " + res.status);
      setOk(isEdit ? "Patient updated ✅" : "Patient created ✅");
      reset();
      load();
    } catch (e) {
      console.error(e);
      setErr("Save failed ❌");
    }
  };

  return (
    <div className="grid2">
      <Card title="Patients" right={<button className="btn ghost" onClick={load}>Refresh</button>}>
        <div className="tableWrap">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Age</th>
                <th>Email</th>
                <th>Phone</th>
                <th style={{ width: 170 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((p) => (
                <tr key={p.id}>
                  <td>{p.name}</td>
                  <td>{p.age}</td>
                  <td>{p.email}</td>
                  <td>{p.phone}</td>
                  <td>
                    <div className="row">
                      <button className="btn small" onClick={() => onEdit(p)}>Edit</button>
                      <button className="btn small danger" onClick={() => onDelete(p.id)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
              {items.length === 0 && (
                <tr><td colSpan="5" className="muted">No patients found</td></tr>
              )}
            </tbody>
          </table>
        </div>

        <Toast kind="ok" text={ok} />
        <Toast kind="err" text={err} />
      </Card>

      <Card title={editingId ? "Edit Patient" : "Add Patient"} right={<button className="btn ghost" onClick={reset}>Clear</button>}>
        <form onSubmit={onSubmit} className="form">
          <div className="formGrid">
            <div>
              <label>Name</label>
              <input className="input" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>

            <div>
              <label>Age</label>
              <input className="input" type="number" min="0" value={age} onChange={(e) => setAge(e.target.value)} />
            </div>

            <div>
              <label>Email</label>
              <input className="input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>

            <div>
              <label>Phone</label>
              <input className="input" value={phone} onChange={(e) => setPhone(e.target.value)} required />
            </div>
          </div>

          <div className="row">
            <button className="btn primary" type="submit">{editingId ? "Update" : "Create"}</button>
            <button className="btn" type="button" onClick={reset}>Cancel</button>
          </div>
        </form>
      </Card>
    </div>
  );
}

/* -------------------- Appointments -------------------- */
function AppointmentsCRUD() {
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);

  const [ok, setOk] = useState("");
  const [err, setErr] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [doctorId, setDoctorId] = useState("");
  const [patientId, setPatientId] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [status, setStatus] = useState("BOOKED");

  const reset = () => {
    setEditingId(null);
    setDoctorId("");
    setPatientId("");
    setDate("");
    setTime("");
    setStatus("BOOKED");
  };

  const loadAll = async () => {
    try {
      setErr(""); setOk("");
      const [aRes, dRes, pRes] = await Promise.all([
        fetch("/api/appointments"),
        fetch("/api/doctors"),
        fetch("/api/patients"),
      ]);
      if (!aRes.ok) throw new Error("Appointments HTTP " + aRes.status);
      if (!dRes.ok) throw new Error("Doctors HTTP " + dRes.status);
      if (!pRes.ok) throw new Error("Patients HTTP " + pRes.status);

      const [a, d, p] = await Promise.all([aRes.json(), dRes.json(), pRes.json()]);
      setAppointments(Array.isArray(a) ? a : []);
      setDoctors(Array.isArray(d) ? d : []);
      setPatients(Array.isArray(p) ? p : []);
    } catch (e) {
      console.error(e);
      setErr("Failed to load appointments");
    }
  };

  useEffect(() => { loadAll(); }, []);

  const doctorMap = useMemo(() => Object.fromEntries(doctors.map(d => [d.id, d.name])), [doctors]);
  const patientMap = useMemo(() => Object.fromEntries(patients.map(p => [p.id, p.name])), [patients]);

  const onEdit = (a) => {
    setEditingId(a.id);
    setDoctorId(String(a.doctorId ?? a.doctor?.id ?? ""));
    setPatientId(String(a.patientId ?? a.patient?.id ?? ""));
    setDate(a.date ?? "");
    setTime(a.time ?? "");
    setStatus(a.status ?? "BOOKED");
  };

  const onDelete = async (id) => {
    if (!confirm("Delete this appointment?")) return;
    try {
      setErr(""); setOk("");
      const res = await fetch(`/api/appointments/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("HTTP " + res.status);
      setOk("Appointment deleted ✅");
      loadAll();
    } catch (e) {
      console.error(e);
      setErr("Delete failed ❌");
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setErr(""); setOk("");

      const payload = {
        doctorId: Number(doctorId),
        patientId: Number(patientId),
        date,
        time,
        status,
      };

      const isEdit = editingId != null;
      const url = isEdit ? `/api/appointments/${editingId}` : "/api/appointments";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("HTTP " + res.status);
      setOk(isEdit ? "Appointment updated ✅" : "Appointment created ✅");
      reset();
      loadAll();
    } catch (e) {
      console.error(e);
      setErr("Save failed ❌ (Check doctorId/patientId/date/time)");
    }
  };

  return (
    <div className="grid2">
      <Card title="Appointments" right={<button className="btn ghost" onClick={loadAll}>Refresh</button>}>
        <div className="tableWrap">
          <table className="table">
            <thead>
              <tr>
                <th>Doctor</th>
                <th>Patient</th>
                <th>Date</th>
                <th>Time</th>
                <th>Status</th>
                <th style={{ width: 170 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((a) => (
                <tr key={a.id}>
                  <td>{doctorMap[a.doctorId] || a.doctor?.name || a.doctorName || a.doctorId}</td>
                  <td>{patientMap[a.patientId] || a.patient?.name || a.patientName || a.patientId}</td>
                  <td>{a.date}</td>
                  <td>{a.time}</td>
                  <td><span className="pill">{a.status}</span></td>
                  <td>
                    <div className="row">
                      <button className="btn small" onClick={() => onEdit(a)}>Edit</button>
                      <button className="btn small danger" onClick={() => onDelete(a.id)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
              {appointments.length === 0 && (
                <tr><td colSpan="6" className="muted">No appointments found</td></tr>
              )}
            </tbody>
          </table>
        </div>

        <Toast kind="ok" text={ok} />
        <Toast kind="err" text={err} />
      </Card>

      <Card title={editingId ? "Edit Appointment" : "Book Appointment"} right={<button className="btn ghost" onClick={reset}>Clear</button>}>
        <form onSubmit={onSubmit} className="form">
          <div className="formGrid">
            <div>
              <label>Doctor</label>
              <select className="input" value={doctorId} onChange={(e) => setDoctorId(e.target.value)} required>
                <option value="">Select doctor</option>
                {doctors.map(d => <option key={d.id} value={d.id}>{d.name} - {d.specialization}</option>)}
              </select>
            </div>

            <div>
              <label>Patient</label>
              <select className="input" value={patientId} onChange={(e) => setPatientId(e.target.value)} required>
                <option value="">Select patient</option>
                {patients.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
              </select>
            </div>

            <div>
              <label>Date</label>
              <input className="input" type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
            </div>

            <div>
              <label>Time</label>
              <input className="input" placeholder="09:30 AM" value={time} onChange={(e) => setTime(e.target.value)} required />
            </div>

            <div>
              <label>Status</label>
              <select className="input" value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="BOOKED">BOOKED</option>
                <option value="CONFIRMED">CONFIRMED</option>
                <option value="COMPLETED">COMPLETED</option>
                <option value="CANCELLED">CANCELLED</option>
              </select>
            </div>
          </div>

          <div className="row">
            <button className="btn primary" type="submit">{editingId ? "Update" : "Create"}</button>
            <button className="btn" type="button" onClick={reset}>Cancel</button>
          </div>
        </form>
      </Card>
    </div>
  );
}

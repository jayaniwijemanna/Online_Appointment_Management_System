import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div style={{ marginTop: 18 }}>
      <div className="grid2">
        <div className="card">
          <h2 className="h2">Welcome 👋</h2>
          <p className="muted">
            Your health is our priority. Easily book and manage your medical appointments from the comfort of your home.
             Our user-friendly platform ensures quick, secure, and hassle-free access to healthcare services. 
             Stay connected with qualified healthcare professionals and take the first step towards better health today.
          </p>

          <div className="btnRow">
            <Link className="btnPrimary" to="/appointments">Book Appointment</Link>
            <Link className="btnGhost" to="/doctors">View Doctors</Link>
            <button onClick={() => window.location.href = "/admin/login"}>
  Admin Login
</button>
          </div>
        </div>

        <div className="card">
          <h2 className="h2">Quick Overview</h2>
          <div className="stats">
            <div className="stat">
              <div className="statNum">3</div>
              <div className="muted">Modules</div>
            </div>
            <div className="stat">
              <div className="statNum">REST</div>
              <div className="muted">API Backend</div>
            </div>
            <div className="stat">
              <div className="statNum">MySQL</div>
              <div className="muted">Database</div>
            </div>
          </div>

          <div className="note">
            <span className="badgeBlue">Tip</span>
            <span className="muted" style={{ marginLeft: 10 }}>
              Use the top menu to navigate between Doctors, Patients, and Appointments.
            </span>
          </div>
        </div>
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <h2 className="h2">How to Demo (for Viva)</h2>
        <ol className="muted" style={{ lineHeight: 1.8 }}>
          <li>Start Backend (Spring Boot) → confirm <code>/api/doctors</code> JSON</li>
          <li>Start Frontend (React) → open Home page</li>
          <li>Go to Patients → add a new patient</li>
          <li>Go to Appointments → book an appointment</li>
          <li>Refresh → show updated list</li>
        </ol>
      </div>
    </div>
    
  );
}

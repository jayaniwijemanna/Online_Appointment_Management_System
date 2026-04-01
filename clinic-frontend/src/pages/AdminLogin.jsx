import { useState } from "react";
import { useNavigate } from "react-router-dom";
import bg from "../assets/login-bg.jpeg"; // ✅ image import

export default function AdminLogin() {
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("admin123");
  const [err, setErr] = useState("");

  const nav = useNavigate();

  const login = (e) => {
    e.preventDefault();
    setErr("");

    if (username === "admin" && password === "admin123") {
      localStorage.setItem("adminLoggedIn", "true");
      nav("/admin/dashboard");
      return;
    }
    setErr("Invalid credentials ❌ (try admin / admin123)");
  };

  return (
    // ✅ bg url css variable එකට දානවා
    <div className="adminLoginPage" style={{ "--bgUrl": `url(${bg})` }}>
      <div className="adminLoginWrap">
        <div className="adminLoginHeader">
          <div className="adminLoginTitle">Online Clinic Management System</div>
          <div className="adminLoginSub">Admin Portal Login</div>
        </div>

        <div className="card adminLoginCard">
          <div className="cardHead">
            <div>
              <div className="cardTitle">Admin Login</div>
              <div className="cardSub">Use admin / admin123</div>
            </div>
          </div>

          <div className="cardBody">
            <form onSubmit={login} className="form">
              <div className="formGrid">
                <div>
                  <label>Username</label>
                  <input
                    className="input"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>

                <div>
                  <label>Password</label>
                  <input
                    className="input"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              {err && <div className="toast err">{err}</div>}

              <div className="row">
                <button className="btn primary" type="submit">
                  Login
                </button>
                <button
                  className="btn"
                  type="button"
                  onClick={() => {
                    localStorage.removeItem("adminLoggedIn");
                    setUsername("admin");
                    setPassword("admin123");
                    setErr("");
                  }}
                >
                  Reset
                </button>
              </div>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}

import { useState } from "react";

const TEAL = "#2d7d6f";
const TEAL_DARK = "#1e5c50";
const DEMO_EMAIL = "admin@kdu.ac.lk";
const DEMO_PASSWORD = "admin123";

const IconBook = () => (
  <img src="/logo.jpg" width="32" height="32" alt="logo" />
);
const IconMail = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
    <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 7 10-7"/>
  </svg>
);
const IconLock = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
    <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);
const IconEye = ({ off }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
    {off ? (
      <><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></>
    ) : (
      <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>
    )}
  </svg>
);
const IconLogin = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/>
  </svg>
);

const css = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'DM Sans', sans-serif; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  @keyframes spin { to { transform: rotate(360deg); } }
  @keyframes shake {
    0%,100%{transform:translateX(0)}
    20%,60%{transform:translateX(-6px)}
    40%,80%{transform:translateX(6px)}
  }

  .fade-up   { animation: fadeUp 0.55s cubic-bezier(.22,1,.36,1) both; }
  .fade-up-2 { animation: fadeUp 0.55s 0.08s cubic-bezier(.22,1,.36,1) both; }
  .fade-up-3 { animation: fadeUp 0.55s 0.16s cubic-bezier(.22,1,.36,1) both; }
  .fade-up-4 { animation: fadeUp 0.55s 0.24s cubic-bezier(.22,1,.36,1) both; }
  .fade-up-5 { animation: fadeUp 0.55s 0.32s cubic-bezier(.22,1,.36,1) both; }
  .fade-in   { animation: fadeIn 0.4s ease both; }
  .shake     { animation: shake 0.4s ease; }

  .input-field {
    width: 100%; padding: 12px 12px 12px 44px;
    border: 1.5px solid #e0e0e0; border-radius: 10px;
    font-size: 14.5px; font-family: 'DM Sans', sans-serif;
    background: #fafafa; color: #1a1a1a; outline: none;
    transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
  }
  .input-field:focus { border-color: ${TEAL}; background: #fff; box-shadow: 0 0 0 3px ${TEAL}22; }
  .input-field.error { border-color: #e53935; box-shadow: 0 0 0 3px #e5393522; }
  .input-field::placeholder { color: #bbb; }

  .btn-primary {
    width: 100%; padding: 13px; background: ${TEAL}; color: white;
    border: none; border-radius: 10px; font-size: 15px; font-weight: 600;
    font-family: 'DM Sans', sans-serif; cursor: pointer;
    display: flex; align-items: center; justify-content: center; gap: 8px;
    transition: background 0.2s, transform 0.1s, box-shadow 0.2s; letter-spacing: .3px;
  }
  .btn-primary:hover:not(:disabled) { background: ${TEAL_DARK}; box-shadow: 0 4px 16px ${TEAL}44; transform: translateY(-1px); }
  .btn-primary:disabled { opacity: .7; cursor: not-allowed; }
`;

export default function LoginPage({ onLogin, logAction }) {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw]     = useState(false);
  const [errors, setErrors]     = useState({});
  const [loading, setLoading]   = useState(false);
  const [shake, setShake]       = useState(false);
  const [loginErr, setLoginErr] = useState("");

  const validate = () => {
    const e = {};
    if (!email)                            e.email    = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) e.email    = "Enter a valid email address";
    if (!password)                         e.password = "Password is required";
    else if (password.length < 6)         e.password = "Password must be at least 6 characters";
    return e;
  };

  const handleSubmit = async () => {
    setLoginErr("");
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({});
    setLoading(true);
    await new Promise(r => setTimeout(r, 900));
    if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
      logAction("LOGIN", `Admin logged in as ${email}`);
      onLogin(email);
    } else {
      setLoading(false);
      setLoginErr("Invalid credentials. Please try again.");
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  const handleKey = e => { if (e.key === "Enter") handleSubmit(); };

  return (
    <>
      <style>{css}</style>
      <div style={{
        minHeight: "100vh", display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        background: `linear-gradient(135deg, ${TEAL_DARK} 0%, ${TEAL} 50%, #3a9e8a 100%)`,
        padding: "24px", position: "relative", overflow: "hidden",
      }}>
        {[[-120,-120,320],[null,-80,180,{right:"-80px",top:"-80px"}],[null,null,100,{right:"10%",bottom:"10%"}]].map(([l,t,s,extra],i)=>(
          <div key={i} style={{
            position:"absolute", borderRadius:"50%", width:s, height:s,
            background:"rgba(255,255,255,.06)",
            top: t ?? undefined, left: l ?? undefined, ...(extra||{})
          }}/>
        ))}

        <div className={shake ? "shake" : ""} style={{
          background: "white", borderRadius: "20px", padding: "44px 40px 36px",
          width: "100%", maxWidth: "440px",
          boxShadow: "0 24px 64px rgba(0,0,0,.22)", position: "relative", zIndex: 1,
        }}>
          <div className="fade-up" style={{ textAlign: "center", marginBottom: "20px" }}>
            <div style={{
              width: 64, height: 64, borderRadius: 16,
              background: `linear-gradient(135deg, ${TEAL}, ${TEAL_DARK})`,
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              boxShadow: `0 8px 24px ${TEAL}55`, marginBottom: "16px",
            }}>
              <IconBook />
            </div>
            <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "24px", color: "#111", lineHeight: 1.2 }}>
              Student Management System
            </h1>
            <p style={{ fontSize: "13px", color: "#888", marginTop: "4px" }}>General Sir John Kotelawala Defence University</p>
            <p style={{ fontSize: "12px", color: "#aaa" }}>Department of Software Engineering</p>
          </div>

          <div style={{ height: "1px", background: "#f0f0f0", margin: "20px 0" }} />

          <div className="fade-up-2">
            <h2 style={{ fontSize: "19px", fontWeight: 700, color: "#111", marginBottom: "4px" }}>Administrator Login</h2>
            <p style={{ fontSize: "13px", color: "#888", marginBottom: "24px" }}>Enter your credentials to access the system</p>
          </div>

          <div className="fade-up-3" style={{ marginBottom: "16px" }}>
            <label style={{ fontSize: "13px", fontWeight: 600, color: "#333", display: "block", marginBottom: "6px" }}>Email Address</label>
            <div style={{ position: "relative" }}>
              <div style={{ position: "absolute", left: "13px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}><IconMail /></div>
              <input className={`input-field ${errors.email ? "error" : ""}`} type="email" placeholder="admin@kdu.ac.lk"
                value={email} onChange={e => { setEmail(e.target.value); setErrors(p=>({...p,email:""})); }} onKeyDown={handleKey}/>
            </div>
            {errors.email && <p style={{ color: "#e53935", fontSize: "12px", marginTop: "4px" }}>{errors.email}</p>}
          </div>

          <div className="fade-up-4" style={{ marginBottom: "24px" }}>
            <label style={{ fontSize: "13px", fontWeight: 600, color: "#333", display: "block", marginBottom: "6px" }}>Password</label>
            <div style={{ position: "relative" }}>
              <div style={{ position: "absolute", left: "13px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}><IconLock /></div>
              <input className={`input-field ${errors.password ? "error" : ""}`} type={showPw ? "text" : "password"} placeholder="Enter your password"
                value={password} onChange={e => { setPassword(e.target.value); setErrors(p=>({...p,password:""})); }}
                onKeyDown={handleKey} style={{ paddingRight: "44px" }}/>
              <button onClick={() => setShowPw(v => !v)} style={{
                position: "absolute", right: "13px", top: "50%", transform: "translateY(-50%)",
                background: "none", border: "none", cursor: "pointer", padding: 0,
              }}>
                <IconEye off={!showPw} />
              </button>
            </div>
            {errors.password && <p style={{ color: "#e53935", fontSize: "12px", marginTop: "4px" }}>{errors.password}</p>}
          </div>

          {loginErr && (
            <div className="fade-in" style={{
              background: "#fdecea", border: "1px solid #f5c6c4", borderRadius: "8px",
              padding: "10px 14px", color: "#c62828", fontSize: "13px", marginBottom: "16px",
            }}>
              {loginErr}
            </div>
          )}

          <div className="fade-up-5">
            <button className="btn-primary" onClick={handleSubmit} disabled={loading}>
              {loading
                ? <span style={{ width:18,height:18,border:"2.5px solid rgba(255,255,255,.4)",borderTopColor:"white",borderRadius:"50%",display:"inline-block",animation:"spin .7s linear infinite" }}/>
                : <IconLogin />
              }
              {loading ? "Authenticating…" : "Login to System"}
            </button>
          </div>
        </div>

        <div className="fade-up-5" style={{
          marginTop: "16px", background: "rgba(255,255,255,.12)", borderRadius: "12px",
          padding: "14px 20px", width: "100%", maxWidth: "440px",
          backdropFilter: "blur(8px)", zIndex: 1,
        }}>
          <p style={{ color:"rgba(255,255,255,.7)",fontSize:"12px",fontWeight:600,marginBottom:"6px",letterSpacing:".5px",textTransform:"uppercase" }}>Demo Credentials</p>
          <p style={{ color:"white",fontSize:"13px" }}><span style={{opacity:.7}}>Email: </span>{DEMO_EMAIL}</p>
          <p style={{ color:"white",fontSize:"13px" }}><span style={{opacity:.7}}>Password: </span>admin123</p>
        </div>
      </div>
    </>
  );
}

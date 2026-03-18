import { useState } from "react";
import RegisterStudent from "./RegisterStudent";
import GenerateNumber from "./GenerateNumber";
import RemoveStudent from "./RemoveStudent";
import SystemSettings from "./SystemSettings";

const TEAL = "#2d7d6f";
const TEAL_DARK = "#1e5c50";
const TEAL_LIGHT = "#e8f5f2";
const DEMO_EMAIL = "admin@kdu.ac.lk";
const DEMO_PASSWORD = "admin123";

const auditLog = [];
function logAction(action, details = "") {
  auditLog.push({ timestamp: new Date().toISOString(), action, details });
}

// ── Icons ──────────────────────────────────────────────────────────────────
const IconBook = ({ size = 32 }) => (
  <img src="/logo.jpg" width={size} height={size} alt="KDU Logo" style={{ objectFit:"contain" }} />
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
    {off ? (<><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></>) : (<><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>)}
  </svg>
);
const IconLogin = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/>
  </svg>
);
const IconLogout = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
  </svg>
);
const IconDashboard = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
    <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
  </svg>
);
const IconUserPlus = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/>
  </svg>
);
const IconHash = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
    <line x1="4" y1="9" x2="20" y2="9"/><line x1="4" y1="15" x2="20" y2="15"/><line x1="10" y1="3" x2="8" y2="21"/><line x1="16" y1="3" x2="14" y2="21"/>
  </svg>
);
const IconUserMinus = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="22" y1="11" x2="16" y2="11"/>
  </svg>
);
const IconUsers = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);
const IconSearch = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);
const IconBook2 = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
  </svg>
);
const IconShield = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);
const IconSettings = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
    <circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
  </svg>
);
const IconTrend = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="13" height="13">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>
  </svg>
);
const IconClock = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="12" height="12">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
);
const IconCalendar = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="14" height="14">
    <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);


// ── Data ───────────────────────────────────────────────────────────────────
const INITIAL_STUDENTS = [
  { 
    id: "KDU/SE/2021/001", 
    name: "Ashan Perera",       
    email: "ashan@kdu.ac.lk",   
    program: "BSc Software Engineering",   
    year: 3, 
    gpa: "3.72", 
    status: "Active",
    birthday: "2000-01-15",
    address: "123 Main Street, Colombo 03",
    phone: "+94 77 123 4567",
    courses: ["Software Engineering", "Database Systems", "Web Development"]
  },
  { 
    id: "KDU/SE/2021/002", 
    name: "Nimasha Silva",      
    email: "nimasha@kdu.ac.lk", 
    program: "BSc Software Engineering",   
    year: 3, 
    gpa: "3.51", 
    status: "Active",
    birthday: "2001-03-22",
    address: "45 Park Avenue, Kandy",
    phone: "+94 71 234 5678",
    courses: ["Software Engineering", "Database Systems", "Mobile Application Development"]
  },
  { 
    id: "KDU/SE/2022/001", 
    name: "Tharindu Fernando",  
    email: "thari@kdu.ac.lk",   
    program: "BSc Computer Science",       
    year: 2, 
    gpa: "3.88", 
    status: "Active",
    birthday: "2002-07-10",
    address: "78 Galle Road, Galle",
    phone: "+94 76 345 6789",
    courses: ["Data Structures and Algorithms", "Computer Networks", "Artificial Intelligence"]
  },
  { 
    id: "KDU/SE/2020/003", 
    name: "Dilani Jayawardena", 
    email: "dilani@kdu.ac.lk",  
    program: "BSc Software Engineering",   
    year: 4, 
    gpa: "3.30", 
    status: "Active",
    birthday: "1999-11-05",
    address: "234 Temple Road, Kurunegala",
    phone: "+94 72 456 7890",
    courses: ["Software Engineering", "Machine Learning", "Cloud Computing", "Cybersecurity"]
  },
  { 
    id: "KDU/SE/2023/001", 
    name: "Kasun Rathnayake",   
    email: "kasun@kdu.ac.lk",   
    program: "BSc Information Technology", 
    year: 1, 
    gpa: "3.60", 
    status: "Active",
    birthday: "2003-09-18",
    address: "567 Beach Road, Negombo",
    phone: "+94 77 567 8901",
    courses: ["Web Development", "Database Systems", "Computer Networks"]
  },
];
const COURSES = [
  { name: "Software Engineering",  enrolled: 234, total: 250, color: TEAL },
  { name: "Database Systems",      enrolled: 198, total: 200, color: "#43a047" },
  { name: "Web Development",       enrolled: 187, total: 220, color: "#1e88e5" },
  { name: "Machine Learning",      enrolled: 156, total: 180, color: "#8e24aa" },
  { name: "Computer Networks",     enrolled: 142, total: 160, color: "#fb8c00" },
  { name: "Data Structures and Algorithms", enrolled: 145, total: 170, color: "#e91e63" },
  { name: "Mobile Application Development", enrolled: 112, total: 150, color: "#00acc1" },
  { name: "Artificial Intelligence", enrolled: 98, total: 130, color: "#5e35b1" },
  { name: "Cloud Computing",       enrolled: 76, total: 120, color: "#fdd835" },
  { name: "Cybersecurity",         enrolled: 82, total: 110, color: "#d32f2f" },
];
const RECENT_ACTIVITIES = [
  { action: "New student registered",    detail: "Ashan Perera · KDU/SE/2021/001",    time: "5 minutes ago",  color: "#43a047" },
  { action: "Student number generated",  detail: "Nimasha Silva · KDU/SE/2021/002",  time: "12 minutes ago", color: TEAL },
  { action: "Course enrollment updated", detail: "Tharindu Fernando · KDU/SE/2022/001", time: "1 hour ago",     color: "#1e88e5" },
  { action: "Student removed",           detail: "Dilani Jayawardena · KDU/SE/2020/003", time: "2 hours ago",  color: "#e53935" },
  { action: "New course added",          detail: "System Admin · Cloud Computing", time: "3 hours ago",  color: "#8e24aa" },
];
const DEADLINES = [
  { title:"Semester 1 Registration", date:"February 15, 2026", days:7,  pct:70, color:"#fb8c00" },
  { title:"Course Update Period",    date:"February 20, 2026", days:12, pct:55, color:"#e53935" },
  { title:"Academic Year Planning",  date:"March 1, 2026",     days:21, pct:35, color:"#43a047" },
];

// ── CSS ────────────────────────────────────────────────────────────────────
const css = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600;700&display=swap');
  * { box-sizing:border-box; margin:0; padding:0; }
  body { font-family:'DM Sans',sans-serif; }

  @keyframes fadeUp  { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
  @keyframes fadeIn  { from{opacity:0} to{opacity:1} }
  @keyframes spin    { to{transform:rotate(360deg)} }
  @keyframes shake   { 0%,100%{transform:translateX(0)} 20%,60%{transform:translateX(-6px)} 40%,80%{transform:translateX(6px)} }
  @keyframes slideIn { from{opacity:0;transform:translateX(-12px)} to{opacity:1;transform:translateX(0)} }

  .fade-up  { animation:fadeUp .55s cubic-bezier(.22,1,.36,1) both; }
  .fade-up-2{ animation:fadeUp .55s .08s cubic-bezier(.22,1,.36,1) both; }
  .fade-up-3{ animation:fadeUp .55s .16s cubic-bezier(.22,1,.36,1) both; }
  .fade-up-4{ animation:fadeUp .55s .24s cubic-bezier(.22,1,.36,1) both; }
  .fade-up-5{ animation:fadeUp .55s .32s cubic-bezier(.22,1,.36,1) both; }
  .fade-in  { animation:fadeIn .4s ease both; }
  .slide-in { animation:slideIn .3s ease both; }
  .shake    { animation:shake .4s ease; }

  .input-field {
    width:100%; padding:12px 12px 12px 44px;
    border:1.5px solid #e0e0e0; border-radius:10px;
    font-size:14.5px; font-family:'DM Sans',sans-serif;
    background:#fafafa; color:#1a1a1a; outline:none;
    transition:border-color .2s,box-shadow .2s,background .2s;
  }
  .input-field:focus { border-color:${TEAL}; background:#fff; box-shadow:0 0 0 3px ${TEAL}22; }
  .input-field.error { border-color:#e53935; box-shadow:0 0 0 3px #e5393522; }
  .input-field::placeholder { color:#bbb; }

  .btn-primary {
    width:100%; padding:13px; background:${TEAL}; color:white;
    border:none; border-radius:10px; font-size:15px; font-weight:600;
    font-family:'DM Sans',sans-serif; cursor:pointer;
    display:flex; align-items:center; justify-content:center; gap:8px;
    transition:background .2s,transform .1s,box-shadow .2s; letter-spacing:.3px;
  }
  .btn-primary:hover:not(:disabled) { background:${TEAL_DARK}; box-shadow:0 4px 16px ${TEAL}44; transform:translateY(-1px); }
  .btn-primary:active:not(:disabled) { transform:translateY(0); }
  .btn-primary:disabled { opacity:.7; cursor:not-allowed; }

  .nav-item {
    display:flex; align-items:center; gap:12px;
    padding:11px 16px; border-radius:10px; cursor:pointer;
    font-size:14px; font-weight:500; color:rgba(255,255,255,.7);
    transition:background .15s,color .15s; border:none; background:none;
    width:100%; font-family:'DM Sans',sans-serif; text-align:left;
  }
  .nav-item:hover { background:rgba(255,255,255,.1); color:white; }
  .nav-item.active { background:rgba(255,255,255,.18); color:white; font-weight:600; }

  .card { background:white; border-radius:14px; border:1px solid #eef0f2; box-shadow:0 2px 12px rgba(0,0,0,.05); }

  .stat-card {
    background:white; border-radius:14px; border:1px solid #eef0f2;
    padding:20px 22px; box-shadow:0 2px 8px rgba(0,0,0,.04);
    transition:transform .2s,box-shadow .2s; cursor:default;
  }
  .stat-card:hover { transform:translateY(-3px); box-shadow:0 8px 24px rgba(0,0,0,.09); }

  .table-row { transition:background .15s; }
  .table-row:hover { background:${TEAL_LIGHT}; }

  .stat-badge {
    display:inline-flex; align-items:center; padding:3px 10px;
    border-radius:20px; font-size:12px; font-weight:600;
  }

  .prog-bar { height:7px; border-radius:4px; background:#eee; overflow:hidden; margin-top:7px; }
  .prog-fill { height:100%; border-radius:4px; transition:width .6s ease; }

  .action-btn {
    display:flex; align-items:center; gap:10px; padding:14px 18px;
    border-radius:12px; border:none; cursor:pointer;
    font-family:'DM Sans',sans-serif; font-weight:600; font-size:14px;
    transition:transform .2s,box-shadow .2s; text-align:left; width:100%;
  }
  .action-btn:hover { transform:translateY(-2px); }

  ::-webkit-scrollbar { width:5px; }
  ::-webkit-scrollbar-track { background:#f0f0f0; }
  ::-webkit-scrollbar-thumb { background:#ccc; border-radius:4px; }
`;

// ── Login Page (unchanged from your existing code) ─────────────────────────
function LoginPage({ onLogin }) {
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
    <div style={{
      minHeight:"100vh", display:"flex", flexDirection:"column",
      alignItems:"center", justifyContent:"center",
      background:`linear-gradient(135deg, ${TEAL_DARK} 0%, ${TEAL} 50%, #3a9e8a 100%)`,
      padding:"24px", position:"relative", overflow:"hidden",
    }}>
      {[[-120,-120,320],[null,-80,180,{right:"-80px",top:"-80px"}],[null,null,100,{right:"10%",bottom:"10%"}]].map(([l,t,s,extra],i)=>(
        <div key={i} style={{ position:"absolute",borderRadius:"50%",width:s,height:s,background:"rgba(255,255,255,.06)",top:t??undefined,left:l??undefined,...(extra||{}) }}/>
      ))}

      <div className={shake?"shake":""} style={{
        background:"white", borderRadius:"20px", padding:"44px 40px 36px",
        width:"100%", maxWidth:"440px", boxShadow:"0 24px 64px rgba(0,0,0,.22)",
        position:"relative", zIndex:1,
      }}>
        <div className="fade-up" style={{ textAlign:"center", marginBottom:"20px" }}>
          <div style={{
            width:64, height:64, borderRadius:16,
            background:`linear-gradient(135deg, ${TEAL}, ${TEAL_DARK})`,
            display:"inline-flex", alignItems:"center", justifyContent:"center",
            boxShadow:`0 8px 24px ${TEAL}55`, marginBottom:"16px",
          }}>
            <IconBook size={36} />
          </div>
          <h1 style={{ fontFamily:"'DM Serif Display',serif", fontSize:"24px", color:"#111", lineHeight:1.2 }}>
            Student Management System
          </h1>
          <p style={{ fontSize:"13px", color:"#888", marginTop:"4px" }}>General Sir John Kotelawala Defence University</p>
          <p style={{ fontSize:"12px", color:"#aaa" }}>Department of Software Engineering</p>
        </div>

        <div style={{ height:"1px", background:"#f0f0f0", margin:"20px 0" }} />

        <div className="fade-up-2">
          <h2 style={{ fontSize:"19px", fontWeight:700, color:"#111", marginBottom:"4px" }}>Administrator Login</h2>
          <p style={{ fontSize:"13px", color:"#888", marginBottom:"24px" }}>Enter your credentials to access the system</p>
        </div>

        <div className="fade-up-3" style={{ marginBottom:"16px" }}>
          <label style={{ fontSize:"13px",fontWeight:600,color:"#333",display:"block",marginBottom:"6px" }}>Email Address</label>
          <div style={{ position:"relative" }}>
            <div style={{ position:"absolute",left:"13px",top:"50%",transform:"translateY(-50%)",pointerEvents:"none" }}><IconMail /></div>
            <input className={`input-field ${errors.email?"error":""}`} type="email" placeholder="admin@kdu.ac.lk"
              value={email} onChange={e=>{setEmail(e.target.value);setErrors(p=>({...p,email:""}));}} onKeyDown={handleKey}/>
          </div>
          {errors.email && <p style={{ color:"#e53935",fontSize:"12px",marginTop:"4px" }}>{errors.email}</p>}
        </div>

        <div className="fade-up-4" style={{ marginBottom:"24px" }}>
          <label style={{ fontSize:"13px",fontWeight:600,color:"#333",display:"block",marginBottom:"6px" }}>Password</label>
          <div style={{ position:"relative" }}>
            <div style={{ position:"absolute",left:"13px",top:"50%",transform:"translateY(-50%)",pointerEvents:"none" }}><IconLock /></div>
            <input className={`input-field ${errors.password?"error":""}`} type={showPw?"text":"password"} placeholder="Enter your password"
              value={password} onChange={e=>{setPassword(e.target.value);setErrors(p=>({...p,password:""}));}} onKeyDown={handleKey} style={{paddingRight:"44px"}}/>
            <button onClick={()=>setShowPw(v=>!v)} style={{ position:"absolute",right:"13px",top:"50%",transform:"translateY(-50%)",background:"none",border:"none",cursor:"pointer",padding:0 }}>
              <IconEye off={!showPw}/>
            </button>
          </div>
          {errors.password && <p style={{ color:"#e53935",fontSize:"12px",marginTop:"4px" }}>{errors.password}</p>}
        </div>

        {loginErr && (
          <div className="fade-in" style={{ background:"#fdecea",border:"1px solid #f5c6c4",borderRadius:"8px",padding:"10px 14px",color:"#c62828",fontSize:"13px",marginBottom:"16px" }}>
            {loginErr}
          </div>
        )}

        <div className="fade-up-5">
          <button className="btn-primary" onClick={handleSubmit} disabled={loading}>
            {loading
              ? <span style={{ width:18,height:18,border:"2.5px solid rgba(255,255,255,.4)",borderTopColor:"white",borderRadius:"50%",display:"inline-block",animation:"spin .7s linear infinite" }}/>
              : <IconLogin />}
            {loading ? "Authenticating…" : "Login to System"}
          </button>
        </div>
      </div>

      <div className="fade-up-5" style={{
        marginTop:"16px", background:"rgba(255,255,255,.12)", borderRadius:"12px",
        padding:"14px 20px", width:"100%", maxWidth:"440px", backdropFilter:"blur(8px)", zIndex:1,
      }}>
        <p style={{ color:"rgba(255,255,255,.7)",fontSize:"12px",fontWeight:600,marginBottom:"6px",letterSpacing:".5px",textTransform:"uppercase" }}>Demo Credentials</p>
        <p style={{ color:"white",fontSize:"13px" }}><span style={{opacity:.7}}>Email: </span>{DEMO_EMAIL}</p>
        <p style={{ color:"white",fontSize:"13px" }}><span style={{opacity:.7}}>Password: </span>admin123</p>
      </div>
    </div>
  );
}

// ── Dashboard ──────────────────────────────────────────────────────────────
function Dashboard({ adminEmail, onLogout }) {
  const [page, setPage]             = useState("dashboard");
  const [students, setStudents]     = useState(INITIAL_STUDENTS);
  const [sidebarOpen, setSidebar]   = useState(true);
  const [form, setForm]             = useState({ id:"",name:"",email:"",program:"",year:"",gpa:"" });
  const [formErr, setFormErr]       = useState({});
  const [regSuccess, setRegSuccess] = useState("");
  const [query, setQuery]           = useState("");
  const [editId, setEditId]         = useState(null);
  const [editForm, setEditForm]     = useState({});
  const [deleteId, setDeleteId]     = useState(null);
  const [removeQuery, setRemoveQuery] = useState("");

  const searchResult = query.trim()
    ? students.filter(s =>
        s.name.toLowerCase().includes(query.toLowerCase()) ||
        s.id.toLowerCase().includes(query.toLowerCase()) ||
        s.email.toLowerCase().includes(query.toLowerCase()))
    : [];

  const removeResults = removeQuery.trim()
    ? students.filter(s =>
        s.name.toLowerCase().includes(removeQuery.toLowerCase()) ||
        s.id.toLowerCase().includes(removeQuery.toLowerCase()))
    : students;

  const navItems = [
    { id:"dashboard", label:"Dashboard",        icon:<IconDashboard /> },
    { id:"register",  label:"Register Student", icon:<IconUserPlus /> },
    { id:"generate",  label:"Generate Number",  icon:<IconHash /> },
    { id:"remove",    label:"Remove Student",   icon:<IconUserMinus /> },
    { id:"list",      label:"List Students",    icon:<IconUsers /> },
    { id:"search",    label:"Search Student",   icon:<IconSearch /> },
    { id:"courses",   label:"Manage Courses",   icon:<IconBook2 /> },
    { id:"audit",     label:"Audit Trail",      icon:<IconShield /> },
  ];

  const fieldStyle = err => ({
    width:"100%", padding:"10px 12px",
    border:`1.5px solid ${err?"#e53935":"#e0e0e0"}`,
    borderRadius:"8px", fontSize:"14px",
    fontFamily:"'DM Sans',sans-serif", background:"#fafafa", outline:"none",
    transition:"border-color .2s",
  });

  const validateForm = () => {
    const e = {};
    if (!form.id)      e.id      = "Student ID required";
    if (!form.name)    e.name    = "Name required";
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Valid email required";
    if (!form.program) e.program = "Program required";
    if (!form.year || isNaN(form.year)) e.year = "Valid year required";
    if (!form.gpa)     e.gpa    = "GPA required";
    return e;
  };

  const handleRegister = () => {
    const e = validateForm();
    if (Object.keys(e).length) { setFormErr(e); return; }
    setStudents(p => [...p, { ...form, status:"Active" }]);
    logAction("REGISTER", `Registered student ${form.id} - ${form.name}`);
    setRegSuccess(`Student "${form.name}" registered successfully!`);
    setForm({ id:"",name:"",email:"",program:"",year:"",gpa:"" });
    setFormErr({});
    setTimeout(() => setRegSuccess(""), 4000);
  };



  const startEdit = s => { setEditId(s.id); setEditForm({...s}); };
  const saveEdit  = () => {
    setStudents(p => p.map(s => s.id === editId ? editForm : s));
    logAction("UPDATE", `Updated student ${editId}`);
    setEditId(null);
  };
  const doDelete = () => {
    const s = students.find(x => x.id === deleteId);
    setStudents(p => p.filter(s => s.id !== deleteId));
    logAction("DELETE", `Removed student ${deleteId} - ${s?.name}`);
    setDeleteId(null);
  };

  const handleLogout = () => {
    logAction("LOGOUT", `Admin ${adminEmail} logged out`);
    onLogout();
  };

  const avgGpa = students.length
    ? (students.reduce((a,s) => a + parseFloat(s.gpa||0), 0) / students.length).toFixed(2)
    : "0.00";

  return (
    <div style={{ display:"flex", height:"100vh", fontFamily:"'DM Sans',sans-serif", background:"#f4f6f8", overflow:"hidden" }}>

      {/* ══ SIDEBAR ══ */}
      <aside style={{
        width: sidebarOpen ? 240 : 68, minWidth: sidebarOpen ? 240 : 68,
        background:`linear-gradient(180deg, ${TEAL_DARK} 0%, #2a7a6c 100%)`,
        display:"flex", flexDirection:"column",
        transition:"width .25s,min-width .25s", overflow:"hidden", flexShrink:0,
        boxShadow:"2px 0 16px rgba(0,0,0,.12)",
      }}>
        {/* Brand */}
        <div style={{
          padding: sidebarOpen ? "18px 18px 14px" : "18px 14px 14px",
          borderBottom:"1px solid rgba(255,255,255,.1)",
          display:"flex", alignItems:"center", gap:"10px",
        }}>
          <div style={{
            width:42, height:42, flexShrink:0, borderRadius:10,
            background:"rgba(255,255,255,.15)",
            display:"flex", alignItems:"center", justifyContent:"center", overflow:"hidden",
          }}>
            <IconBook size={30} />
          </div>
          {sidebarOpen && (
            <div>
              <p style={{ fontSize:"13px",fontWeight:700,color:"white",lineHeight:1.2 }}>Student Management</p>
              <p style={{ fontSize:"11px",color:"rgba(255,255,255,.55)" }}>System</p>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav style={{ padding:"10px 10px", flex:1, overflowY:"auto" }}>
          {navItems.map(n => (
            <button key={n.id} onClick={() => setPage(n.id)}
              className={`nav-item ${page===n.id?"active":""}`}
              title={!sidebarOpen ? n.label : ""}
              style={{ justifyContent:sidebarOpen?"flex-start":"center", marginBottom:"2px" }}
            >
              {n.icon}
              {sidebarOpen && <span>{n.label}</span>}
            </button>
          ))}
        </nav>

        {/* Bottom */}
        <div style={{ padding:"10px 10px", borderTop:"1px solid rgba(255,255,255,.1)" }}>
          <button onClick={()=>setPage("settings")}
            className={`nav-item ${page==="settings"?"active":""}`}
            style={{ justifyContent:sidebarOpen?"flex-start":"center", marginBottom:"4px" }}
            title={!sidebarOpen?"Settings":""}
          >
            <IconSettings />{sidebarOpen && "Settings"}
          </button>
          <button onClick={handleLogout} className="nav-item"
            style={{ color:"rgba(255,160,160,.9)", justifyContent:sidebarOpen?"flex-start":"center" }}
            title={!sidebarOpen?"Logout":""}
          >
            <IconLogout />{sidebarOpen && "Logout"}
          </button>
        </div>
      </aside>

      {/* ══ MAIN ══ */}
      <div style={{ flex:1, display:"flex", flexDirection:"column", overflow:"hidden" }}>

        {/* Header */}
        <header style={{
          height:62, background:"white", borderBottom:"1px solid #eef0f2",
          display:"flex", alignItems:"center", padding:"0 24px", gap:"14px",
          boxShadow:"0 1px 6px rgba(0,0,0,.05)",
        }}>
          <button onClick={()=>setSidebar(v=>!v)} style={{ background:"none",border:"none",cursor:"pointer",display:"flex",flexDirection:"column",gap:"4px",padding:"6px",borderRadius:6 }}>
            {[0,1,2].map(i=><span key={i} style={{ display:"block",width:20,height:2,background:"#666",borderRadius:2 }}/>)}
          </button>
          <div style={{ flex:1 }}>
            <h2 style={{ fontSize:"18px",fontWeight:700,color:"#111",lineHeight:1 }}>
              {[...navItems,{id:"settings",label:"Settings"}].find(n=>n.id===page)?.label || "Dashboard"}
            </h2>
            <p style={{ fontSize:"12px",color:"#aaa",marginTop:"2px" }}>
              Overview & Analytics · KDU Department of Software Engineering
            </p>
          </div>
          {/* Admin badge */}
          <div style={{ display:"flex",alignItems:"center",gap:"10px" }}>
            <div style={{ textAlign:"right" }}>
              <p style={{ fontSize:"13px",fontWeight:600,color:"#111" }}>Administrator</p>
              <p style={{ fontSize:"11px",color:"#aaa" }}>{adminEmail}</p>
            </div>
            <div style={{
              width:38, height:38, borderRadius:"50%",
              background:`linear-gradient(135deg,${TEAL},${TEAL_DARK})`,
              display:"flex", alignItems:"center", justifyContent:"center",
              color:"white", fontWeight:700, fontSize:"15px", flexShrink:0,
            }}>
              {adminEmail.charAt(0).toUpperCase()}
            </div>
          </div>
        </header>

        {/* Content */}
        <main style={{ flex:1, overflowY:"auto", padding:"22px 24px" }}>

          {/* ══ DASHBOARD HOME ══ */}
          {page === "dashboard" && (
            <div className="fade-in">

              {/* Stat Cards */}
              <div style={{ display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:"16px",marginBottom:"20px" }}>
                {[
                  { label:"Total Students",    value:students.length,                                 icon:"👥", trend:"+12.5%", bg:"#e8f5f2", ic:TEAL },
                  { label:"New Registrations", value:students.filter(s=>s.year===1).length,           icon:"✏️", trend:"+23.1%", bg:"#e3f2fd", ic:"#1e88e5" },
                  { label:"Active Courses",    value:COURSES.length,                                  icon:"🎓", trend:"+5.2%",  bg:"#f3e5f5", ic:"#8e24aa" },
                  { label:"Completion Rate",   value:"94.3%",                                         icon:"🏆", trend:"+2.8%",  bg:"#fff8e1", ic:"#fb8c00" },
                ].map((s,i) => (
                  <div key={i} className="stat-card">
                    <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"14px" }}>
                      <div style={{ width:48,height:48,borderRadius:12,background:s.bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"22px" }}>
                        {s.icon}
                      </div>
                      <span style={{ fontSize:"12px",fontWeight:600,color:"#43a047",display:"flex",alignItems:"center",gap:"3px",background:"#e8f5e9",padding:"3px 8px",borderRadius:20 }}>
                        <IconTrend />{s.trend}
                      </span>
                    </div>
                    <p style={{ fontSize:"30px",fontWeight:700,color:"#111",lineHeight:1 }}>{s.value}</p>
                    <p style={{ fontSize:"12px",color:"#999",marginTop:"5px",textTransform:"uppercase",letterSpacing:".4px" }}>{s.label}</p>
                  </div>
                ))}
              </div>

              {/* Middle: Recent Activities + Upcoming Deadlines */}
              <div style={{ display:"grid",gridTemplateColumns:"1fr 300px",gap:"16px",marginBottom:"20px" }}>

                {/* Recent Activities */}
                <div className="card" style={{ padding:"20px" }}>
                  <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"18px" }}>
                    <h3 style={{ fontSize:"15px",fontWeight:700,color:"#111" }}>Recent Activities</h3>
                    <button onClick={()=>setPage("audit")} style={{ fontSize:"13px",color:TEAL,background:"none",border:"none",cursor:"pointer",fontWeight:600 }}>View All</button>
                  </div>
                  {RECENT_ACTIVITIES.map((a,i) => (
                    <div key={i} style={{ display:"flex",gap:"12px",marginBottom:i<RECENT_ACTIVITIES.length-1?"16px":0,alignItems:"flex-start" }}>
                      <div style={{ width:36,height:36,borderRadius:"50%",background:`${a.color}15`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
                        <div style={{ width:8,height:8,borderRadius:"50%",background:a.color }}/>
                      </div>
                      <div style={{ flex:1,minWidth:0 }}>
                        <p style={{ fontSize:"13.5px",fontWeight:600,color:"#111",marginBottom:"2px" }}>{a.action}</p>
                        <p style={{ fontSize:"12px",color:"#888" }}>{a.detail}</p>
                      </div>
                      <span style={{ fontSize:"11.5px",color:"#aaa",whiteSpace:"nowrap",display:"flex",alignItems:"center",gap:"4px",flexShrink:0,marginTop:2 }}>
                        <IconClock />{a.time}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Upcoming Deadlines */}
                <div className="card" style={{ padding:"20px" }}>
                  <h3 style={{ fontSize:"15px",fontWeight:700,color:"#111",marginBottom:"18px" }}>Upcoming Deadlines</h3>
                  {DEADLINES.map((d,i) => (
                    <div key={i} style={{ marginBottom:i<DEADLINES.length-1?"16px":0,padding:"14px",borderRadius:"10px",background:"#fffdf4",border:"1px solid #f5e9c0" }}>
                      <div style={{ display:"flex",alignItems:"center",gap:"6px",marginBottom:"3px" }}>
                        <IconCalendar />
                        <p style={{ fontSize:"13px",fontWeight:700,color:"#111" }}>{d.title}</p>
                      </div>
                      <p style={{ fontSize:"12px",color:"#888",marginBottom:"8px" }}>{d.date}</p>
                      <div style={{ display:"flex",alignItems:"center",gap:"8px" }}>
                        <div className="prog-bar" style={{ flex:1 }}>
                          <div className="prog-fill" style={{ width:`${d.pct}%`,background:d.color }}/>
                        </div>
                        <span style={{ fontSize:"12px",fontWeight:700,color:d.color,whiteSpace:"nowrap",minWidth:28 }}>{d.days}d</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top Enrolled Courses */}
              <div className="card" style={{ padding:"20px" }}>
                <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"18px" }}>
                  <h3 style={{ fontSize:"15px",fontWeight:700,color:"#111" }}>Top Enrolled Courses</h3>
                  <button onClick={()=>setPage("courses")} style={{ fontSize:"13px",color:TEAL,background:"none",border:"none",cursor:"pointer",fontWeight:600 }}>Manage Courses</button>
                </div>
                <div style={{ display:"grid",gap:"12px" }}>
                  {COURSES.map((c,i) => (
                    <div key={i} style={{ display:"flex",alignItems:"center",gap:"16px" }}>
                      <span style={{ fontSize:"13px",fontWeight:700,color:"#bbb",width:26,flexShrink:0 }}>#{i+1}</span>
                      <div style={{ flex:1,minWidth:0 }}>
                        <div style={{ display:"flex",justifyContent:"space-between",marginBottom:"5px" }}>
                          <p style={{ fontSize:"13.5px",fontWeight:600,color:"#111" }}>{c.name}</p>
                          <span style={{ fontSize:"12px",color:"#888" }}>{c.enrolled}/{c.total} students</span>
                        </div>
                        <div className="prog-bar">
                          <div className="prog-fill" style={{ width:`${(c.enrolled/c.total)*100}%`,background:c.color }}/>
                        </div>
                      </div>
                      <span style={{ fontSize:"13.5px",fontWeight:700,color:c.color,width:46,textAlign:"right",flexShrink:0 }}>
                        {((c.enrolled/c.total)*100).toFixed(1)}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ══ REGISTER ══ */}
          {page === "register" && (
            <RegisterStudent
              logAction={logAction}
              onSuccess={(student) => setStudents(p => [...p, student])}
            />
          )}

          {/* ══ GENERATE NUMBER ══ */}
          {page === "generate" && (
            <GenerateNumber
              students={students}
              logAction={logAction}
              onNavigate={(p) => setPage(p)}
            />
          )}

          {/* ══ REMOVE STUDENT ══ */}
        {page === "remove" && (
  <RemoveStudent
    students={students}
    onRemove={(id) => setStudents(p => p.filter(s => s.id !== id))}
    logAction={logAction}
  />
      )}

      
    

          {/* ══ LIST STUDENTS ══ */}
          {page === "list" && (
            <div className="fade-in">
              <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"16px" }}>
                <p style={{ fontSize:"13px",color:"#888" }}>{students.length} students enrolled</p>
                <button onClick={()=>setPage("register")} className="btn-primary" style={{ width:"auto",padding:"9px 20px",fontSize:"13px" }}>
                  <IconUserPlus /> Add Student
                </button>
              </div>
              <div className="card" style={{ overflow:"hidden" }}>
                <div style={{ overflowX:"auto" }}>
                  <table style={{ width:"100%",borderCollapse:"collapse",fontSize:"13.5px" }}>
                    <thead>
                      <tr style={{ background:"#f8f9fa" }}>
                        {["Student ID","Name","Email","Program","Year","GPA","Status","Actions"].map(h=>(
                          <th key={h} style={{ padding:"13px 16px",textAlign:"left",fontWeight:700,color:"#555",fontSize:"11.5px",textTransform:"uppercase",letterSpacing:".5px",whiteSpace:"nowrap" }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {students.map(s => (
                        <tr key={s.id} className="table-row" style={{ borderTop:"1px solid #f0f0f0" }}>
                          {editId === s.id ? (
                            <>
                              {["id","name","email","program","year","gpa"].map(k=>(
                                <td key={k} style={{ padding:"10px 16px" }}>
                                  <input style={{ ...fieldStyle(false),padding:"7px 9px",fontSize:"13px",width:k==="year"||k==="gpa"?70:undefined }}
                                    value={editForm[k]} onChange={e=>setEditForm(p=>({...p,[k]:e.target.value}))}/>
                                </td>
                              ))}
                              <td style={{ padding:"10px 16px" }}>—</td>
                              <td style={{ padding:"10px 16px",whiteSpace:"nowrap" }}>
                                <button onClick={saveEdit} style={{ background:TEAL,color:"white",border:"none",borderRadius:6,padding:"6px 14px",fontSize:"12px",cursor:"pointer",marginRight:4,fontFamily:"'DM Sans',sans-serif",fontWeight:600 }}>Save</button>
                                <button onClick={()=>setEditId(null)} style={{ background:"#eee",color:"#555",border:"none",borderRadius:6,padding:"6px 14px",fontSize:"12px",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontWeight:600 }}>Cancel</button>
                              </td>
                            </>
                          ) : (
                            <>
                              <td style={{ padding:"13px 16px",fontWeight:600,color:TEAL,whiteSpace:"nowrap" }}>{s.id}</td>
                              <td style={{ padding:"13px 16px",fontWeight:500 }}>{s.name}</td>
                              <td style={{ padding:"13px 16px",color:"#666" }}>{s.email}</td>
                              <td style={{ padding:"13px 16px",color:"#555",maxWidth:200,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap" }}>{s.program}</td>
                              <td style={{ padding:"13px 16px",textAlign:"center" }}>{s.year}</td>
                              <td style={{ padding:"13px 16px",textAlign:"center",fontWeight:600,color:"#2e7d32" }}>{s.gpa}</td>
                              <td style={{ padding:"13px 16px" }}>
                                <span className="stat-badge" style={{ background:"#e8f5e9",color:"#2e7d32" }}>{s.status}</span>
                              </td>
                              <td style={{ padding:"13px 16px",whiteSpace:"nowrap" }}>
                                <button onClick={()=>startEdit(s)} style={{ background:"#e3f2fd",color:"#1e88e5",border:"none",borderRadius:6,padding:"6px 14px",fontSize:"12px",cursor:"pointer",marginRight:4,fontFamily:"'DM Sans',sans-serif",fontWeight:600 }}>Edit</button>
                                <button onClick={()=>setDeleteId(s.id)} style={{ background:"#fdecea",color:"#e53935",border:"none",borderRadius:6,padding:"6px 14px",fontSize:"12px",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontWeight:600 }}>Delete</button>
                              </td>
                            </>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ══ SEARCH ══ */}
          {page === "search" && (
            <div className="fade-in" style={{ maxWidth:720 }}>
              <div style={{ position:"relative",marginBottom:"20px" }}>
                <div style={{ position:"absolute",left:16,top:"50%",transform:"translateY(-50%)",pointerEvents:"none",color:TEAL }}>
                  <IconSearch />
                </div>
                <input className="input-field" placeholder="Search by name, ID or email…"
                  value={query} onChange={e=>setQuery(e.target.value)}
                  style={{ paddingLeft:48,fontSize:"15px",borderRadius:12 }} autoFocus/>
              </div>
              {query.trim() && (
                <p style={{ fontSize:"13px",color:"#888",marginBottom:"12px" }}>
                  {searchResult.length} result{searchResult.length!==1?"s":""} for "<strong>{query}</strong>"
                </p>
              )}
              {searchResult.map(s => (
                <div key={s.id} className="card slide-in" style={{ padding:"18px 20px",marginBottom:"10px",display:"flex",gap:"16px",alignItems:"center" }}>
                  <div style={{ width:46,height:46,borderRadius:"50%",background:`${TEAL}18`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,color:TEAL,fontWeight:700,fontSize:"18px" }}>
                    {s.name.charAt(0)}
                  </div>
                  <div style={{ flex:1,minWidth:0 }}>
                    <p style={{ fontWeight:700,color:"#111",fontSize:"14px" }}>{s.name}</p>
                    <p style={{ fontSize:"12.5px",color:"#888",marginTop:"2px" }}>{s.id} · {s.email}</p>
                    <p style={{ fontSize:"12.5px",color:"#666",marginTop:"2px" }}>{s.program} · Year {s.year}</p>
                  </div>
                  <div style={{ textAlign:"right",flexShrink:0 }}>
                    <p style={{ fontWeight:700,color:"#2e7d32",fontSize:"18px" }}>{s.gpa}</p>
                    <p style={{ fontSize:"11px",color:"#aaa" }}>GPA</p>
                  </div>
                </div>
              ))}
              {query.trim() && searchResult.length===0 && (
                <div style={{ textAlign:"center",padding:"48px",color:"#ccc" }}>
                  <p style={{ fontSize:"14px",marginTop:"8px" }}>No students found</p>
                </div>
              )}
              {!query.trim() && (
                <div style={{ textAlign:"center",padding:"48px",color:"#ccc" }}>
                  <p style={{ fontSize:"14px" }}>Start typing to search students</p>
                </div>
              )}
            </div>
          )}

          {/* ══ MANAGE COURSES ══ */}
          {page === "courses" && (
            <div className="fade-in">
              <div className="card" style={{ overflow:"hidden" }}>
                <div style={{ padding:"20px 22px",borderBottom:"1px solid #f0f0f0" }}>
                  <h3 style={{ fontSize:"15px",fontWeight:700,color:"#111" }}>All Courses</h3>
                  <p style={{ fontSize:"13px",color:"#888",marginTop:"2px" }}>Enrollment status across all active courses.</p>
                </div>
                {COURSES.map((c,i) => (
                  <div key={i} style={{ padding:"16px 22px",borderBottom:"1px solid #f5f5f5",display:"flex",alignItems:"center",gap:"16px" }}>
                    <span style={{ fontSize:"13px",fontWeight:700,color:"#ccc",width:32,flexShrink:0 }}>#{i+1}</span>
                    <div style={{ flex:1 }}>
                      <div style={{ display:"flex",justifyContent:"space-between",marginBottom:"6px" }}>
                        <p style={{ fontWeight:600,color:"#111",fontSize:"14px" }}>{c.name}</p>
                        <span style={{ fontSize:"12px",color:"#888" }}>{c.enrolled}/{c.total} students</span>
                      </div>
                      <div className="prog-bar" style={{ maxWidth:500 }}>
                        <div className="prog-fill" style={{ width:`${(c.enrolled/c.total)*100}%`,background:c.color }}/>
                      </div>
                    </div>
                    <span className="stat-badge" style={{ background:`${c.color}15`,color:c.color,minWidth:52,justifyContent:"center" }}>
                      {((c.enrolled/c.total)*100).toFixed(1)}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ══ AUDIT TRAIL ══ */}
          {page === "audit" && (
            <div className="fade-in">
              <div className="card" style={{ overflow:"hidden" }}>
                <div style={{ padding:"20px 22px",borderBottom:"1px solid #f0f0f0" }}>
                  <h3 style={{ fontSize:"15px",fontWeight:700,color:"#111" }}>Recent Activities</h3>
                  <p style={{ fontSize:"13px",color:"#888",marginTop:"2px" }}>All administrative actions recorded in real-time.</p>
                </div>
                {auditLog.length === 0
                  ? <p style={{ padding:"28px",color:"#aaa",fontSize:"13px",textAlign:"center" }}>No actions logged yet. Perform actions to see them here.</p>
                  : [...auditLog].reverse().map((log,i) => (
                    <div key={i} style={{ padding:"14px 22px",borderBottom:"1px solid #f5f5f5",display:"flex",gap:"16px",alignItems:"center" }}>
                      <span style={{ fontSize:"11px",color:"#aaa",whiteSpace:"nowrap",minWidth:80 }}>
                        {new Date(log.timestamp).toLocaleTimeString()}
                      </span>
                      <span className="stat-badge" style={{ background:`${TEAL}15`,color:TEAL,minWidth:80,justifyContent:"center" }}>{log.action}</span>
                      <span style={{ fontSize:"13px",color:"#555" }}>{log.details}</span>
                    </div>
                  ))
                }
              </div>
            </div>
          )}

          {/* ══ SETTINGS ══ */}
{page === "settings" && (
  <SystemSettings
    adminEmail={adminEmail}
    students={students}
    avgGpa={avgGpa}
  />
)}

        </main>
      </div>

      {/* ══ DELETE MODAL ══ */}
      {deleteId && (
        <div style={{ position:"fixed",inset:0,background:"rgba(0,0,0,.5)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:100 }}>
          <div className="fade-in" style={{ background:"white",borderRadius:"18px",padding:"32px",maxWidth:380,width:"90%",boxShadow:"0 24px 64px rgba(0,0,0,.25)" }}>
            <div style={{ width:52,height:52,borderRadius:"50%",background:"#fdecea",display:"flex",alignItems:"center",justifyContent:"center",marginBottom:"16px" }}>
              <span style={{ fontSize:"22px" }}>⚠️</span>
            </div>
            <h3 style={{ fontSize:"17px",fontWeight:700,marginBottom:"8px",color:"#111" }}>Remove Student?</h3>
            <p style={{ color:"#666",fontSize:"14px",marginBottom:"24px",lineHeight:1.5 }}>
              This action cannot be undone. The student record will be permanently removed from the system.
            </p>
            <div style={{ display:"flex",gap:"10px" }}>
              <button onClick={()=>setDeleteId(null)} style={{ flex:1,padding:"11px",background:"#f0f0f0",border:"none",borderRadius:9,cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontWeight:600,fontSize:"14px",color:"#555" }}>Cancel</button>
              <button onClick={doDelete} style={{ flex:1,padding:"11px",background:"#e53935",color:"white",border:"none",borderRadius:9,cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontWeight:600,fontSize:"14px" }}>Remove</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── App Root ───────────────────────────────────────────────────────────────
// ── App Root ───────────────────────────────────────────────────────────────
export default function App() {
  const [adminEmail, setAdminEmail] = useState(null);
  return (
    <>
      <style>{css}</style>
      {adminEmail
        ? <Dashboard adminEmail={adminEmail} onLogout={() => setAdminEmail(null)} />
        : <LoginPage onLogin={email => setAdminEmail(email)} />
      }
    </>
  );
}

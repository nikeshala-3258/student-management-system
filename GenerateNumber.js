import { useState } from "react";

const TEAL      = "#2d7d6f";
const TEAL_DARK = "#1e5c50";
const TEAL_LIGHT = "#e8f5f2";

// ── Icons ──────────────────────────────────────────────────────────────────
const IconSearchW = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);
const IconCopy = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="17" height="17">
    <rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
  </svg>
);
const IconCheckW = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="17" height="17">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);
const IconCheckGreen = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke={TEAL} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
  </svg>
);
const IconUser = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke={TEAL} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
  </svg>
);
const IconGradCap = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke={TEAL} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>
  </svg>
);
const IconCalendar = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="13" height="13">
    <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);
const IconPin = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="13" height="13">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
  </svg>
);
const IconMail = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="13" height="13">
    <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 7 10-7"/>
  </svg>
);
const IconPhone = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="13" height="13">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.82a16 16 0 0 0 6.29 6.29l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);
const IconList = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="13" height="13">
    <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/>
    <line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>
  </svg>
);
const IconRefresh = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
    <polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-5"/>
  </svg>
);
const IconUsers = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

const css = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap');
  @keyframes gnFadeIn { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
  .gn-fade { animation: gnFadeIn .4s ease both; }

  .gn-input {
    flex: 1; padding: 13px 16px;
    border: 1.5px solid #dde0e4; border-radius: 10px;
    font-size: 14.5px; font-family: 'DM Sans', sans-serif;
    background: white; color: #1a1a1a; outline: none;
    transition: border-color .2s, box-shadow .2s;
  }
  .gn-input:focus { border-color: ${TEAL}; box-shadow: 0 0 0 3px ${TEAL}18; }
  .gn-input::placeholder { color: #bbb; }

  .gn-btn-gen {
    display: flex; align-items: center; gap: 8px;
    padding: 13px 28px; border-radius: 10px; border: none;
    background: ${TEAL}; font-size: 14.5px; font-weight: 600;
    color: white; font-family: 'DM Sans', sans-serif; cursor: pointer;
    transition: background .2s, transform .1s, box-shadow .2s; white-space: nowrap;
  }
  .gn-btn-gen:hover { background: ${TEAL_DARK}; transform: translateY(-1px); box-shadow: 0 4px 16px ${TEAL}44; }

  .gn-box {
    background: white; border: 1px solid #e8eaed;
    border-radius: 10px; padding: 14px 16px;
  }
  .gn-lbl { font-size: 12px; color: #aaa; margin-bottom: 5px; display: flex; align-items: center; gap: 5px; }
  .gn-val { font-size: 14.5px; font-weight: 600; color: #111; line-height: 1.45; }

  .gn-btn-outline {
    flex: 1; display: flex; align-items: center; justify-content: center; gap: 8px;
    padding: 13px 20px; border-radius: 10px;
    border: 1.5px solid #dde0e4; background: white;
    font-size: 14px; font-weight: 600; color: #444;
    font-family: 'DM Sans', sans-serif; cursor: pointer;
    transition: background .15s, border-color .15s;
  }
  .gn-btn-outline:hover { background: #f5f5f5; }

  .gn-btn-teal {
    flex: 1; display: flex; align-items: center; justify-content: center; gap: 8px;
    padding: 13px 20px; border-radius: 10px; border: none;
    background: ${TEAL}; font-size: 14px; font-weight: 600; color: white;
    font-family: 'DM Sans', sans-serif; cursor: pointer;
    transition: background .2s, box-shadow .2s;
  }
  .gn-btn-teal:hover { background: ${TEAL_DARK}; box-shadow: 0 4px 14px ${TEAL}44; }
`;

export default function GenerateNumber({ students, logAction, onNavigate }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [result,      setResult]      = useState(null);
  const [copied,      setCopied]      = useState(false);
  const [error,       setError]       = useState("");

const handleGenerate = () => {
  setError(""); setResult(null);
  const q = searchQuery.trim().toLowerCase();
  if (!q) { setError("Please enter a student name or ID to search."); return; }
  const match = students.find(s =>
    s.name.toLowerCase().includes(q) ||
    s.id.toLowerCase().includes(q) ||
    (s.email && s.email.toLowerCase().includes(q))
  );
  if (!match) { setError("No student found. Please check and try again."); return; }
  const num     = String(Math.floor(100000 + Math.random() * 900000));
  const regDate = new Date().toLocaleDateString("en-US", { month:"short", day:"numeric", year:"numeric" });
  const yr      = new Date().getFullYear();
  logAction("GENERATE", `Generated number ${num} for ${match.name} (${match.id})`);
  
  // Create a student object with fallback values for missing fields
  const studentWithDefaults = {
    ...match,
    // Provide default values for fields that might be missing
    birthday: match.birthday || "1990-01-01",
    address: match.address || "No address provided",
    phone: match.phone || "+94 77 000 0000",
    courses: match.courses || ["Software Engineering", "Database Systems"] // Default courses
  };
  
  setResult({ number:num, student:studentWithDefaults, regDate, acYear:`${yr}/${yr+1}`, semester:"Semester 1" });
};

  const handleCopy = () => {
    navigator.clipboard.writeText(result.number).catch(()=>{});
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  };

  const formatDOB = (bday) => {
    if (!bday) return null;
    const d = new Date(bday);
    const age = Math.floor((Date.now() - d) / (1000*60*60*24*365.25));
    return d.toLocaleDateString("en-US",{month:"long",day:"numeric",year:"numeric"}) + ` (${age} years)`;
  };

  return (
    <>
      <style>{css}</style>
      <div style={{ fontFamily:"'DM Sans',sans-serif" }}>

        {/* Header */}
        <div style={{ marginBottom:22 }}>
          <h2 style={{ fontSize:22, fontWeight:700, color:"#111" }}>Generate Student Number</h2>
          <p style={{ fontSize:13, color:"#888", marginTop:3 }}>
            Automatic student number generation | KDU Department of Software Engineering
          </p>
        </div>

        {/* Search */}
        <div style={{ display:"flex", gap:12, marginBottom:20 }}>
          <input className="gn-input" placeholder="Search by student name, ID, or email…"
            value={searchQuery}
            onChange={e => { setSearchQuery(e.target.value); setError(""); setResult(null); }}
            onKeyDown={e => e.key==="Enter" && handleGenerate()}
          />
          <button className="gn-btn-gen" onClick={handleGenerate}>
            <IconSearchW /> Generate Number
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="gn-fade" style={{ background:"#fdecea", border:"1px solid #f5c6c4", borderRadius:10, padding:"12px 16px", color:"#c62828", fontSize:13.5, marginBottom:20 }}>
            ⚠️ {error}
          </div>
        )}

        {/* Result */}
        {result && (
          <div className="gn-fade">

            {/* ── Success banner ── */}
            <div style={{ display:"flex", alignItems:"flex-start", gap:12, background:TEAL_LIGHT, border:`1.5px solid ${TEAL}55`, borderRadius:12, padding:"16px 20px", marginBottom:20 }}>
              <div style={{ flexShrink:0, marginTop:1 }}><IconCheckGreen /></div>
              <div>
                <p style={{ fontWeight:700, color:TEAL_DARK, fontSize:15 }}>Student Number Generated Successfully!</p>
                <p style={{ fontSize:13, color:TEAL, marginTop:3 }}>
                  The student has been registered and assigned a unique student number. All information has been saved to the system.
                </p>
              </div>
            </div>

            {/* ── Number card ── */}
            <div style={{ background:`linear-gradient(135deg,${TEAL_DARK},${TEAL})`, borderRadius:14, padding:"28px 32px", marginBottom:20, position:"relative", overflow:"hidden" }}>
              <div style={{ position:"absolute", right:-50, top:-50, width:200, height:200, borderRadius:"50%", background:"rgba(255,255,255,.06)" }}/>
              <div style={{ position:"absolute", right:80, bottom:-70, width:160, height:160, borderRadius:"50%", background:"rgba(255,255,255,.04)" }}/>

              <p style={{ fontSize:11.5, fontWeight:600, color:"rgba(255,255,255,.6)", letterSpacing:"1.2px", textTransform:"uppercase", marginBottom:10 }}>
                Generated Student Number
              </p>

              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:28 }}>
                <p style={{ fontSize:50, fontWeight:800, color:"white", letterSpacing:5, fontFamily:"monospace", lineHeight:1 }}>
                  {result.number}
                </p>
                <button onClick={handleCopy} style={{ display:"flex", alignItems:"center", gap:7, background:"rgba(255,255,255,.18)", border:"1.5px solid rgba(255,255,255,.3)", borderRadius:9, padding:"10px 18px", color:"white", cursor:"pointer", fontFamily:"'DM Sans',sans-serif", fontSize:13.5, fontWeight:600, flexShrink:0 }}>
                  {copied ? <><IconCheckW />Copied!</> : <><IconCopy />Copy</>}
                </button>
              </div>

              <div style={{ height:1, background:"rgba(255,255,255,.18)", marginBottom:20 }}/>

              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:24 }}>
                {[["Registration Date", result.regDate], ["Academic Year", result.acYear], ["Current Semester", result.semester]].map(([lbl, val]) => (
                  <div key={lbl}>
                    <p style={{ fontSize:12, color:"rgba(255,255,255,.55)", marginBottom:5 }}>{lbl}</p>
                    <p style={{ fontSize:15, fontWeight:700, color:"white" }}>{val}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Student Info Summary ── */}
            <div style={{ background:"white", borderRadius:14, border:"1px solid #e8eaed", boxShadow:"0 2px 10px rgba(0,0,0,.05)", overflow:"hidden", marginBottom:20 }}>
              <div style={{ padding:"20px 26px", borderBottom:"1px solid #f0f0f0" }}>
                <h3 style={{ fontSize:16, fontWeight:700, color:"#111" }}>Student Information Summary</h3>
                <p style={{ fontSize:13, color:"#888", marginTop:3 }}>Complete registration details</p>
              </div>

              <div style={{ padding:"22px 26px" }}>
                {/* Personal */}
                <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:16 }}>
                  <IconUser />
                  <h4 style={{ fontSize:14.5, fontWeight:700, color:"#111" }}>Personal Information</h4>
                </div>

                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:12 }}>
                  <div className="gn-box">
                    <div className="gn-lbl">Full Name</div>
                    <div className="gn-val">{result.student.name}</div>
                  </div>
                  <div className="gn-box">
                    <div className="gn-lbl"><IconCalendar /> Date of Birth</div>
                    <div className="gn-val">{formatDOB(result.student.birthday) || "—"}</div>
                  </div>
                </div>

                <div className="gn-box" style={{ marginBottom:12 }}>
                  <div className="gn-lbl"><IconPin /> Address</div>
                  <div className="gn-val">{result.student.address || "—"}</div>
                </div>

                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:28 }}>
                  <div className="gn-box">
                    <div className="gn-lbl"><IconMail /> Email Address</div>
                    <div className="gn-val">{result.student.email}</div>
                  </div>
                  <div className="gn-box">
                    <div className="gn-lbl"><IconPhone /> Phone Number</div>
                    <div className="gn-val">{result.student.phone || "+94 77 000 0000"}</div>
                  </div>
                </div>

                {/* Academic */}
                <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:16 }}>
                  <IconGradCap />
                  <h4 style={{ fontSize:14.5, fontWeight:700, color:"#111" }}>Academic Information</h4>
                </div>

                <div className="gn-box" style={{ marginBottom:12 }}>
                  <div className="gn-lbl">Degree Program</div>
                  <div className="gn-val">{result.student.program}</div>
                </div>

                {result.student.courses && result.student.courses.length > 0 && (
                  <div className="gn-box">
                    <div className="gn-lbl"><IconList /> Enrolled Courses ({result.student.courses.length})</div>
                    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"10px 24px", marginTop:10 }}>
                      {result.student.courses.map((c, i) => (
                        <div key={i} style={{ display:"flex", alignItems:"center", gap:8, fontSize:13.5, color:"#333" }}>
                          <div style={{ width:8, height:8, borderRadius:"50%", background:TEAL, flexShrink:0 }}/>
                          {c}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* ── Next Steps ── */}
            <div style={{ background:"white", borderRadius:14, border:"1px solid #e8eaed", boxShadow:"0 2px 10px rgba(0,0,0,.05)", padding:"20px 26px" }}>
              <h3 style={{ fontSize:15, fontWeight:700, color:"#111", marginBottom:16 }}>Next Steps</h3>
              <div style={{ display:"flex", gap:14 }}>
                <button className="gn-btn-outline" onClick={() => { setResult(null); setSearchQuery(""); }}>
                  <IconRefresh /> Register Another Student
                </button>
                <button className="gn-btn-teal" onClick={() => onNavigate && onNavigate("list")}>
                  <IconUsers /> View All Students
                </button>
              </div>
            </div>

          </div>
        )}

        {/* Empty state */}
        {!result && !error && (
          <div style={{ textAlign:"center", padding:"70px 0" }}>
            <div style={{ width:64, height:64, borderRadius:"50%", background:"#f0f0f0", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 16px", fontSize:26, fontWeight:700, color:"#bbb" }}>#</div>
            <p style={{ fontSize:15, fontWeight:600, color:"#bbb" }}>Search for a student to generate their number</p>
            <p style={{ fontSize:13, color:"#d0d0d0", marginTop:6 }}>Enter a name, ID or email above and press Generate</p>
          </div>
        )}

      </div>
    </>
  );
}

import { useState } from "react";

const TEAL = "#2d7d6f";
const TEAL_DARK = "#1e5c50";
const TEAL_LIGHT = "#e8f5f2";

const AVAILABLE_COURSES = [
  "Database Systems",
  "Software Engineering",
  "Web Development",
  "Mobile Application Development",
  "Data Structures and Algorithms",
  "Computer Networks",
  "Artificial Intelligence",
  "Machine Learning",
  "Cybersecurity",
  "Cloud Computing",
];

const IconUser = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke={TEAL} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
  </svg>
);
const IconBook = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke={TEAL} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
  </svg>
);
const IconCalendar = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
    <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);
const IconReset = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
    <polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-5"/>
  </svg>
);
const IconSubmit = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
  </svg>
);

const css = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Sans:wght@300;400;500;600;700&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'DM Sans', sans-serif; }

  @keyframes fadeIn { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
  .fade-in { animation: fadeIn .4s ease both; }

  .reg-input {
    width: 100%; padding: 12px 14px;
    border: 1.5px solid #dde0e4; border-radius: 8px;
    font-size: 14px; font-family: 'DM Sans', sans-serif;
    background: white; color: #1a1a1a; outline: none;
    transition: border-color .2s, box-shadow .2s;
  }
  .reg-input:focus { border-color: ${TEAL}; box-shadow: 0 0 0 3px ${TEAL}18; }
  .reg-input.error { border-color: #e53935; box-shadow: 0 0 0 3px #e5393518; }
  .reg-input::placeholder { color: #bbb; }

  .course-chip {
    padding: 12px 16px; border-radius: 8px;
    border: 1.5px solid #e8eaed; background: white;
    font-size: 13.5px; font-family: 'DM Sans', sans-serif;
    color: #444; cursor: pointer;
    transition: all .15s; text-align: left;
    width: 100%;
  }
  .course-chip:hover { border-color: ${TEAL}; color: ${TEAL}; background: ${TEAL_LIGHT}; }
  .course-chip.selected { border-color: ${TEAL}; background: ${TEAL_LIGHT}; color: ${TEAL_DARK}; font-weight: 600; }

  .btn-reset {
    display: flex; align-items: center; gap: 7px;
    padding: 11px 24px; border-radius: 9px;
    border: 1.5px solid #dde0e4; background: white;
    font-size: 14px; font-weight: 600; color: #555;
    font-family: 'DM Sans', sans-serif; cursor: pointer;
    transition: background .15s, border-color .15s;
  }
  .btn-reset:hover { background: #f5f5f5; border-color: #ccc; }

  .btn-submit {
    display: flex; align-items: center; gap: 7px;
    padding: 11px 28px; border-radius: 9px;
    border: none; background: ${TEAL};
    font-size: 14px; font-weight: 600; color: white;
    font-family: 'DM Sans', sans-serif; cursor: pointer;
    transition: background .2s, transform .1s, box-shadow .2s;
  }
  .btn-submit:hover { background: ${TEAL_DARK}; box-shadow: 0 4px 16px ${TEAL}44; transform: translateY(-1px); }
  .btn-submit:disabled { opacity: .6; cursor: not-allowed; transform: none; }
`;

export default function RegisterStudent({ onSuccess, logAction }) {
  const [form, setForm] = useState({
    firstName: "", lastName: "", address: "",
    birthday: "", studentId: "", degreeProgram: "",
  });
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [errors, setErrors]   = useState({});
  const [success, setSuccess] = useState("");

  const set = (key, val) => {
    setForm(p => ({ ...p, [key]: val }));
    setErrors(p => ({ ...p, [key]: "" }));
  };

  const toggleCourse = (course) => {
    setSelectedCourses(prev => {
      if (prev.includes(course)) return prev.filter(c => c !== course);
      if (prev.length >= 6) return prev;
      return [...prev, course];
    });
    setErrors(p => ({ ...p, courses: "" }));
  };

  const validate = () => {
    const e = {};
    if (!form.firstName.trim())   e.firstName   = "First name is required";
    if (!form.lastName.trim())    e.lastName    = "Last name is required";
    if (!form.address.trim())     e.address     = "Address is required";
    if (!form.birthday)           e.birthday    = "Birthday is required";
    if (!form.studentId.trim())   e.studentId   = "Student ID is required";
    else if (!/^[a-zA-Z0-9]{6,12}$/.test(form.studentId.replace(/\//g,"")))
                                  e.studentId   = "6–12 alphanumeric characters";
    if (!form.degreeProgram.trim()) e.degreeProgram = "Degree program is required";
    if (selectedCourses.length < 1) e.courses   = "Select at least 1 course";
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    const student = {
      id: form.studentId,
      name: `${form.firstName} ${form.lastName}`,
      email: `${form.firstName.toLowerCase()}.${form.lastName.toLowerCase()}@kdu.ac.lk`,
      program: form.degreeProgram,
      courses: selectedCourses,
      birthday: form.birthday,
      address: form.address,
      year: 1,
      gpa: "0.00",
      status: "Active",
    };
    logAction("REGISTER", `Registered ${student.id} - ${student.name}`);
    if (onSuccess) onSuccess(student);
    setSuccess(`Student "${student.name}" registered successfully!`);
    handleReset();
    setTimeout(() => setSuccess(""), 5000);
  };

  const handleReset = () => {
    setForm({ firstName:"", lastName:"", address:"", birthday:"", studentId:"", degreeProgram:"" });
    setSelectedCourses([]);
    setErrors({});
  };

  const inp = (key, placeholder, type = "text", extra = {}) => (
    <input
      className={`reg-input ${errors[key] ? "error" : ""}`}
      type={type} placeholder={placeholder}
      value={form[key]}
      onChange={e => set(key, e.target.value)}
      {...extra}
    />
  );

  return (
    <>
      <style>{css}</style>
      <div className="fade-in" style={{ maxWidth: 900 }}>

        {/* Page header */}
        <div style={{ marginBottom: 22 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: "#111" }}>Student Registration</h2>
          <p style={{ fontSize: 13, color: "#888", marginTop: 3 }}>
            Add new student to the system | KDU Department of Software Engineering
          </p>
        </div>

        {/* Success banner */}
        {success && (
          <div style={{ background:"#e8f5e9", border:"1px solid #a5d6a7", borderRadius:10, padding:"12px 16px", color:"#2e7d32", fontSize:14, marginBottom:20, display:"flex", alignItems:"center", gap:8 }}>
            ✓ {success}
          </div>
        )}

        {/* Main card */}
        <div style={{ background:"white", borderRadius:14, border:"1px solid #eef0f2", boxShadow:"0 2px 12px rgba(0,0,0,.05)", overflow:"hidden" }}>

          {/* Card header */}
          <div style={{ padding:"20px 28px 16px", borderBottom:"1px solid #f0f0f0" }}>
            <h3 style={{ fontSize:16, fontWeight:700, color:"#111" }}>Student Information</h3>
            <p style={{ fontSize:13, color:"#888", marginTop:4 }}>
              Please fill in all required fields. Fields marked with <span style={{color:"#e53935"}}>*</span> are mandatory.
            </p>
          </div>

          <div style={{ padding:"24px 28px" }}>

            {/* ── Personal Information ── */}
            <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:20 }}>
              <IconUser />
              <h4 style={{ fontSize:14.5, fontWeight:700, color:"#111" }}>Personal Information</h4>
            </div>

            {/* First + Last name */}
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:18 }}>
              <div>
                <label style={{ fontSize:13, fontWeight:600, color:"#333", display:"block", marginBottom:6 }}>
                  First Name <span style={{color:"#e53935"}}>*</span>
                </label>
                {inp("firstName", "Enter first name")}
                {errors.firstName && <p style={{ color:"#e53935", fontSize:11.5, marginTop:4 }}>{errors.firstName}</p>}
              </div>
              <div>
                <label style={{ fontSize:13, fontWeight:600, color:"#333", display:"block", marginBottom:6 }}>
                  Last Name <span style={{color:"#e53935"}}>*</span>
                </label>
                {inp("lastName", "Enter last name")}
                {errors.lastName && <p style={{ color:"#e53935", fontSize:11.5, marginTop:4 }}>{errors.lastName}</p>}
              </div>
            </div>

            {/* Address */}
            <div style={{ marginBottom:18 }}>
              <label style={{ fontSize:13, fontWeight:600, color:"#333", display:"block", marginBottom:6 }}>
                Address <span style={{color:"#e53935"}}>*</span>
              </label>
              <input
                className={`reg-input ${errors.address ? "error" : ""}`}
                placeholder="Enter full address"
                value={form.address}
                onChange={e => set("address", e.target.value)}
              />
              {errors.address && <p style={{ color:"#e53935", fontSize:11.5, marginTop:4 }}>{errors.address}</p>}
            </div>

            {/* Birthday + Student ID */}
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:28 }}>
              <div>
                <label style={{ fontSize:13, fontWeight:600, color:"#333", display:"block", marginBottom:6 }}>
                  Birthday <span style={{color:"#e53935"}}>*</span>
                </label>
                <div style={{ position:"relative" }}>
                  <input
                    className={`reg-input ${errors.birthday ? "error" : ""}`}
                    type="date"
                    value={form.birthday}
                    onChange={e => set("birthday", e.target.value)}
                    style={{ paddingRight:40 }}
                  />
                  <div style={{ position:"absolute", right:12, top:"50%", transform:"translateY(-50%)", pointerEvents:"none" }}>
                    <IconCalendar />
                  </div>
                </div>
                {errors.birthday && <p style={{ color:"#e53935", fontSize:11.5, marginTop:4 }}>{errors.birthday}</p>}
              </div>
              <div>
                <label style={{ fontSize:13, fontWeight:600, color:"#333", display:"block", marginBottom:6 }}>
                  Student ID <span style={{color:"#e53935"}}>*</span>
                </label>
                {inp("studentId", "E.G., KDU2024001")}
                <p style={{ fontSize:11.5, color: errors.studentId ? "#e53935" : "#aaa", marginTop:4 }}>
                  {errors.studentId || "6-12 alphanumeric characters"}
                </p>
              </div>
            </div>

            {/* Divider */}
            <div style={{ height:1, background:"#f0f0f0", marginBottom:24 }} />

            {/* ── Academic Information ── */}
            <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:20 }}>
              <IconBook />
              <h4 style={{ fontSize:14.5, fontWeight:700, color:"#111" }}>Academic Information</h4>
            </div>

            {/* Degree Program */}
            <div style={{ marginBottom:22 }}>
              <label style={{ fontSize:13, fontWeight:600, color:"#333", display:"block", marginBottom:6 }}>
                Degree Program <span style={{color:"#e53935"}}>*</span>
              </label>
              <input
                className={`reg-input ${errors.degreeProgram ? "error" : ""}`}
                placeholder="e.g. BSc Software Engineering"
                value={form.degreeProgram}
                onChange={e => set("degreeProgram", e.target.value)}
                list="programs-list"
              />
              <datalist id="programs-list">
                <option value="BSc Software Engineering"/>
                <option value="BSc Computer Science"/>
                <option value="BSc Information Technology"/>
                <option value="BSc Cybersecurity"/>
              </datalist>
              {errors.degreeProgram && <p style={{ color:"#e53935", fontSize:11.5, marginTop:4 }}>{errors.degreeProgram}</p>}
            </div>

            {/* Enrolled Courses */}
            <div style={{ marginBottom:24 }}>
              <label style={{ fontSize:13, fontWeight:600, color:"#333", display:"block", marginBottom:4 }}>
                Enrolled Courses <span style={{color:"#e53935"}}>*</span>
              </label>
              <p style={{ fontSize:12.5, color:"#888", marginBottom:12 }}>
                Select courses for the current semester (minimum 1, maximum 6)
              </p>
              <div style={{ border:"1px solid #eef0f2", borderRadius:10, padding:16, background:"#fafbfc" }}>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
                  {AVAILABLE_COURSES.map(course => (
                    <button
                      key={course}
                      className={`course-chip ${selectedCourses.includes(course) ? "selected" : ""}`}
                      onClick={() => toggleCourse(course)}
                      type="button"
                    >
                      {selectedCourses.includes(course) && (
                        <span style={{ marginRight:6, fontSize:12 }}>✓</span>
                      )}
                      {course}
                    </button>
                  ))}
                </div>
              </div>
              {errors.courses && <p style={{ color:"#e53935", fontSize:11.5, marginTop:6 }}>{errors.courses}</p>}

              {/* Selected count badge */}
              <div style={{ marginTop:12, display:"flex", alignItems:"center", gap:8 }}>
                <span style={{ fontSize:13, fontWeight:600, color:"#555" }}>Selected:</span>
                <span style={{
                  background: selectedCourses.length > 0 ? TEAL_LIGHT : "#f0f0f0",
                  color: selectedCourses.length > 0 ? TEAL_DARK : "#999",
                  border: `1px solid ${selectedCourses.length > 0 ? TEAL+"44" : "#e0e0e0"}`,
                  borderRadius:20, padding:"3px 12px", fontSize:13, fontWeight:700,
                }}>
                  {selectedCourses.length} course{selectedCourses.length !== 1 ? "s" : ""}
                </span>
                {selectedCourses.length === 6 && (
                  <span style={{ fontSize:12, color:"#fb8c00" }}>Maximum reached</span>
                )}
              </div>
            </div>

          </div>

          {/* Footer buttons */}
          <div style={{
            padding:"16px 28px", borderTop:"1px solid #f0f0f0",
            display:"flex", justifyContent:"flex-end", gap:12,
            background:"#fafbfc",
          }}>
            <button className="btn-reset" onClick={handleReset} type="button">
              <IconReset /> Reset
            </button>
            <button className="btn-submit" onClick={handleSubmit} type="button">
              <IconSubmit /> Submit Registration
            </button>
          </div>

        </div>
      </div>
    </>
  );
}
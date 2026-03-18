import { useState } from "react";

const TEAL = "#2d7d6f";
const TEAL_DARK = "#1e5c50";
const TEAL_LIGHT = "#e8f5f2";

// ── Icons ──────────────────────────────────────────────────────────────────
const IconUser = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke={TEAL} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
  </svg>
);
const IconGlobe = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke={TEAL} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
    <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
);
const IconBell = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke={TEAL} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
  </svg>
);
const IconSave = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
    <polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/>
  </svg>
);
const IconCheck = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="13" height="13">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

// ── Toggle Switch ──────────────────────────────────────────────────────────
function Toggle({ checked, onChange }) {
  return (
    <div
      onClick={() => onChange(!checked)}
      style={{
        width: 44, height: 24, borderRadius: 12, cursor: "pointer",
        background: checked ? TEAL : "#ddd",
        position: "relative", transition: "background .25s", flexShrink: 0,
      }}
    >
      <div style={{
        width: 18, height: 18, borderRadius: "50%", background: "white",
        position: "absolute", top: 3,
        left: checked ? 23 : 3,
        transition: "left .25s",
        boxShadow: "0 1px 4px rgba(0,0,0,.2)",
      }} />
    </div>
  );
}

// ── Section Card ──────────────────────────────────────────────────────────
function SectionCard({ icon, title, children }) {
  return (
    <div style={{
      background: "white", borderRadius: "14px",
      border: "1px solid #eef0f2", boxShadow: "0 2px 12px rgba(0,0,0,.04)",
      marginBottom: "16px", overflow: "hidden",
    }}>
      {/* Section Header */}
      <div style={{
        display: "flex", alignItems: "center", gap: "10px",
        padding: "18px 24px 14px",
      }}>
        <div style={{
          width: 32, height: 32, borderRadius: "8px", background: TEAL_LIGHT,
          display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
        }}>
          {icon}
        </div>
        <h3 style={{ fontSize: "15px", fontWeight: 700, color: "#111" }}>{title}</h3>
      </div>
      <div style={{ height: "1px", background: "#f0f0f0", marginBottom: "20px" }} />
      <div style={{ padding: "0 24px 22px" }}>
        {children}
      </div>
    </div>
  );
}

// ── Input Field ────────────────────────────────────────────────────────────
function SettingInput({ label, value, onChange, placeholder, disabled, type = "text" }) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ marginBottom: "16px" }}>
      <label style={{ fontSize: "13px", fontWeight: 600, color: "#444", display: "block", marginBottom: "7px" }}>
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={e => onChange && onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          width: "100%", padding: "10px 14px",
          border: `1.5px solid ${focused ? TEAL : "#e0e0e0"}`,
          borderRadius: "9px", fontSize: "14px",
          fontFamily: "'DM Sans',sans-serif",
          background: disabled ? "#f8f8f8" : "white",
          color: disabled ? "#aaa" : "#111",
          outline: "none", transition: "border-color .2s, box-shadow .2s",
          boxShadow: focused ? `0 0 0 3px ${TEAL}18` : "none",
        }}
      />
    </div>
  );
}

// ── Select Field ───────────────────────────────────────────────────────────
function SettingSelect({ label, value, onChange, options }) {
  const [focused, setFocused] = useState(false);
  return (
    <div>
      <label style={{ fontSize: "13px", fontWeight: 600, color: "#444", display: "block", marginBottom: "7px" }}>
        {label}
      </label>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          width: "100%", padding: "10px 14px",
          border: `1.5px solid ${focused ? TEAL : "#e0e0e0"}`,
          borderRadius: "9px", fontSize: "14px",
          fontFamily: "'DM Sans',sans-serif",
          background: "white", color: "#111",
          outline: "none", transition: "border-color .2s, box-shadow .2s",
          boxShadow: focused ? `0 0 0 3px ${TEAL}18` : "none",
          cursor: "pointer", appearance: "auto",
        }}
      >
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  );
}

// ── Notification Row ───────────────────────────────────────────────────────
function NotifRow({ title, desc, checked, onChange }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "16px 18px", borderRadius: "10px",
      border: "1px solid #f0f0f0", background: "#fafafa",
      marginBottom: "10px", gap: "16px",
    }}>
      <div>
        <p style={{ fontSize: "14px", fontWeight: 600, color: "#111", marginBottom: "3px" }}>{title}</p>
        <p style={{ fontSize: "12px", color: "#999" }}>{desc}</p>
      </div>
      <Toggle checked={checked} onChange={onChange} />
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────
export default function SystemSettings({ adminEmail, students, avgGpa }) {
  const [fullName, setFullName]       = useState("Administrator");
  const [email, setEmail]             = useState(adminEmail || "admin@kdu.ac.lk");
  const [language, setLanguage]       = useState("en");
  const [timezone, setTimezone]       = useState("Asia/Colombo");
  const [emailNotif, setEmailNotif]   = useState(true);
  const [systemAlerts, setSystemAlerts] = useState(true);
  const [saved, setSaved]             = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="fade-in" style={{ maxWidth: 720 }}>

      {/* ── Page Header ── */}
      <div style={{ marginBottom: "22px" }}>
        <h2 style={{ fontSize: "22px", fontWeight: 700, color: "#111", lineHeight: 1.2 }}>System Settings</h2>
        <p style={{ fontSize: "13px", color: "#999", marginTop: "4px" }}>
          Configure system preferences and security · KDU Department of Software Engineering
        </p>
      </div>

      {/* ── Profile Information ── */}
      <SectionCard icon={<IconUser />} title="Profile Information">
        <SettingInput
          label="Full Name"
          value={fullName}
          onChange={setFullName}
          placeholder="Administrator"
        />
        <SettingInput
          label="Email Address"
          value={email}
          onChange={setEmail}
          placeholder="admin@kdu.ac.lk"
          type="email"
        />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
          <SettingInput
            label="Institution"
            value="General Sir John Kotelawala Defence University"
            disabled
          />
          <SettingInput
            label="Department"
            value="Software Engineering"
            disabled
          />
        </div>
      </SectionCard>

      {/* ── System Preferences ── */}
      <SectionCard icon={<IconGlobe />} title="System Preferences">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
          <SettingSelect
            label="Language"
            value={language}
            onChange={setLanguage}
            options={[
              { value: "en", label: "English" },
              { value: "si", label: "Sinhala" },
              { value: "ta", label: "Tamil" },
            ]}
          />
          <SettingSelect
            label="Timezone"
            value={timezone}
            onChange={setTimezone}
            options={[
              { value: "Asia/Colombo", label: "Asia/Colombo (UTC+5:30)" },
              { value: "UTC",          label: "UTC" },
              { value: "Asia/Dubai",   label: "Asia/Dubai (UTC+4)" },
              { value: "Asia/Singapore", label: "Asia/Singapore (UTC+8)" },
            ]}
          />
        </div>

        {/* System Info Pills */}
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px", marginTop: "6px",
        }}>
          {[
            { label: "System Version", value: "v1.0.0" },
            { label: "Total Students", value: `${students?.length ?? 0} enrolled` },
            { label: "Average GPA",    value: avgGpa ?? "—" },
          ].map((item, i) => (
            <div key={i} style={{
              padding: "12px 16px", borderRadius: "10px",
              background: TEAL_LIGHT, border: `1px solid ${TEAL}22`,
            }}>
              <p style={{ fontSize: "11px", color: TEAL_DARK, fontWeight: 600, textTransform: "uppercase", letterSpacing: ".4px", marginBottom: "4px" }}>{item.label}</p>
              <p style={{ fontSize: "14px", fontWeight: 700, color: TEAL_DARK }}>{item.value}</p>
            </div>
          ))}
        </div>
      </SectionCard>

      {/* ── Notifications ── */}
      <SectionCard icon={<IconBell />} title="Notifications">
        <NotifRow
          title="Email Notifications"
          desc="Receive email alerts for important events"
          checked={emailNotif}
          onChange={setEmailNotif}
        />
        <NotifRow
          title="System Alerts"
          desc="Get notified about system status changes"
          checked={systemAlerts}
          onChange={setSystemAlerts}
        />
      </SectionCard>

      {/* ── Session Memory Notice ── */}
      <div style={{
        padding: "13px 16px", borderRadius: "10px",
        background: TEAL_LIGHT, border: `1px solid ${TEAL}30`,
        marginBottom: "20px",
      }}>
        <p style={{ fontSize: "13px", color: TEAL_DARK, fontWeight: 500 }}>
          ℹ️ Data is stored in session memory and will reset on page refresh.
        </p>
      </div>

      {/* ── Save Button ── */}
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button
          onClick={handleSave}
          style={{
            display: "flex", alignItems: "center", gap: "8px",
            background: saved ? "#43a047" : TEAL,
            color: "white", border: "none", borderRadius: "10px",
            padding: "12px 28px", fontSize: "14px", fontWeight: 600,
            fontFamily: "'DM Sans',sans-serif", cursor: "pointer",
            boxShadow: `0 4px 16px ${saved ? "#43a04755" : TEAL + "44"}`,
            transition: "background .25s, box-shadow .25s, transform .1s",
            transform: "translateY(0)",
          }}
          onMouseEnter={e => { if (!saved) e.currentTarget.style.background = TEAL_DARK; }}
          onMouseLeave={e => { if (!saved) e.currentTarget.style.background = TEAL; }}
        >
          {saved ? <IconCheck /> : <IconSave />}
          {saved ? "Settings Saved!" : "Save Settings"}
        </button>
      </div>
    </div>
  );
}

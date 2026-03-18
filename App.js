import { useState } from "react";

import LoginPage from "./LoginPage";

import Dashboard from "./Dashboard";

// Shared audit log — passed down to both pages
const auditLog = [];
export function logAction(action, details = "") {
  auditLog.push({ timestamp: new Date().toISOString(), action, details });
}
export { auditLog };

export default function App() {
  const [adminEmail, setAdminEmail] = useState(null);

  return adminEmail
    ? <Dashboard
        adminEmail={adminEmail}
        onLogout={() => setAdminEmail(null)}
        logAction={logAction}
        auditLog={auditLog}
      />
    : <LoginPage
        onLogin={email => setAdminEmail(email)}
        logAction={logAction}
      />;
}

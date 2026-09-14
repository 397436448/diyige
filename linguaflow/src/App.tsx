import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import { AppShell } from './components/AppShell';
import { AuthPage } from './pages/Auth';
import { Dashboard } from './pages/Dashboard';
import { Courses } from './pages/Courses';
import { LearnPage } from './pages/Learn';
import { Progress } from './pages/Progress';
import { Achievements } from './pages/Achievements';

function ProtectedRoutes() {
  const { user } = useApp();
  if (!user) return <Navigate to="/" replace />;
  return (
    <AppShell>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/learn/:id" element={<LearnPage />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="/achievements" element={<Achievements />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </AppShell>
  );
}

function PublicRoute() {
  const { user } = useApp();
  if (user) return <Navigate to="/dashboard" replace />;
  return <AuthPage />;
}

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PublicRoute />} />
          <Route path="/*" element={<ProtectedRoutes />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

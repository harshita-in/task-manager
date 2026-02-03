import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Auth from './components/auth';
import TaskManager from './components/taskmanager';
import { auth } from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

function App() {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-rose-500">Loading...</div>;
  }

  return (
    <Router>
      <div className="min-h-screen">
        <Routes>
          <Route
            path="/login"
            element={!user ? <Auth /> : <Navigate to="/" />}
          />
          <Route
            path="/"
            element={user ? <TaskManager user={user} /> : <Navigate to="/login" />}
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
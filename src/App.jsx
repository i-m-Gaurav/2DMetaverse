import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Login from './components/Login';
import MetaverseGame from './components/MetaverseGame';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/game"
            element={
              <PrivateRoute>
                <MetaverseGame />
              </PrivateRoute>
            }
          />
          {/* Redirect root to /login */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          {/* Catch-all route for any undefined paths */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;

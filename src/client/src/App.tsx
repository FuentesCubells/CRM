import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import './App.css';
// import HeaderUI from './ui/header/header.ui';

import AuthView from './views/auth/auth.view';
import ProtectedRoute from "./components/auth/protected-routes/protected-routes.component";
import DashboarbView from "./views/dashboard/dashboard.component";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/auth" replace />} />
        <Route path="/auth" element={<AuthView />}/>
        
        <Route 
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboarbView></DashboarbView>
              </ProtectedRoute>
            }
          />
      </Routes>
    </Router>
  )
}

export default App

import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "./components/layout/Landing";
import Auth from "./views/Auth";
import Dashboard from "./views/Dashboard";
import AuthContextProvider from "./contexts/AuthContext";
import ProtectedRoute from "./components/routing/ProtectedRoute";
import Booking from "./views/Booking";
import Revenue from "./views/Revenue";
import System from "./views/System";
import Account from "./views/Account";

function App() {
  return (
    <AuthContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route exact path="/login" element={<Auth authRoute="login" />} />
          <Route
            exact
            path="/register"
            element={<Auth authRoute="register" />}
          />
          <Route
            exact
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/booking"
            element={
              <ProtectedRoute>
                <Booking />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/system-management"
            element={
              <ProtectedRoute>
                <System />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/revenue-management"
            element={
              <ProtectedRoute>
                <Revenue />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/account-management"
            element={
              <ProtectedRoute>
                <Account />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthContextProvider>
  );
}

export default App;

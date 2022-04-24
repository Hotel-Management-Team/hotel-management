import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "./components/layout/Landing";
import Auth from "./views/Auth";
import Dashboard from "./views/Dashboard";
import AuthContextProvider from "./contexts/AuthContext";
import ProtectedRoute from "./components/routing/ProtectedRoute";
import ProtecteAdmin from "./components/routing/ProtectedAdmin";
import Booking from "./views/Booking";
import Revenue from "./views/Revenue";
import System from "./views/System/index";
import Rooms from "./views/System/Rooms/index";
import Account from "./views/System/Account/index";
import RoomType from "./views/System/RoomType/index";
import Charge from "./views/System/Charge/index";
import SubAccount from "./views/System/SubAccount";
import RoomsContextProvider from "./contexts/RoomsContext";
import RoomTypeContextProvider from "./contexts/RoomTypeContext";
import ChargeContextProvider from "./contexts/ChargesContext";
import BookingsContextProvider from "./contexts/BookingsContext";
import AccountContextProvider from "./contexts/AccountContext";
import SubAccountContextProvider from "./contexts/SubAccountContext";

function App() {
  return (
    <AuthContextProvider>
      <RoomsContextProvider>
        <RoomTypeContextProvider>
          <ChargeContextProvider>
            <BookingsContextProvider>
              <AccountContextProvider>
                <SubAccountContextProvider>
                  <Router>
                    <Routes>
                      <Route path="/" element={<Landing />} />
                      <Route
                        exact
                        path="/login"
                        element={<Auth authRoute="login" />}
                      />
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
                      <Route
                        exact
                        path="/system-management/rooms"
                        element={
                          <ProtectedRoute>
                            <Rooms />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        exact
                        path="/system-management/charge-calculations"
                        element={
                          <ProtectedRoute>
                            <Charge />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        exact
                        path="/system-management/room-types"
                        element={
                          <ProtectedRoute>
                            <RoomType />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        exact
                        path="/system-management/sub-accounts"
                        element={
                          <ProtectedRoute>
                            <ProtecteAdmin>
                              <SubAccount />
                            </ProtecteAdmin>
                          </ProtectedRoute>
                        }
                      />
                    </Routes>
                  </Router>
                </SubAccountContextProvider>
              </AccountContextProvider>
            </BookingsContextProvider>
          </ChargeContextProvider>
        </RoomTypeContextProvider>
      </RoomsContextProvider>
    </AuthContextProvider>
  );
}

export default App;

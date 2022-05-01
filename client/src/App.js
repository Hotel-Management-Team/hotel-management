import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "./components/layout/Landing";
import Auth from "./views/Auth";
import Dashboard from "./views/Dashboard";
import AuthContextProvider from "./contexts/AuthContext";
import ProtectedRoute from "./components/routing/ProtectedRoute";
import ProtectedAdmin from "./components/routing/ProtectedAdmin";
import ProtectedRoom from "./components/routing/ProtectedRoom";
import ProtectedRoomType from "./components/routing/ProtectedRoomType";
import ProtectedCharge from "./components/routing/ProtectedCharge";
import Booking from "./views/Booking/index";
import ProtectedBooking from "./components/routing/ProtectedBooking";
import Revenue from "./views/Revenue";
import System from "./views/System/index";
import Rooms from "./views/System/Rooms/index";
import Account from "./views/Account";
import RoomType from "./views/System/RoomType/index";
import Charge from "./views/System/Charge/index";
import SubAccount from "./views/System/SubAccount";
import RoomsContextProvider from "./contexts/RoomsContext";
import RoomTypeContextProvider from "./contexts/RoomTypeContext";
import ChargeContextProvider from "./contexts/ChargesContext";
import BookingsContextProvider from "./contexts/BookingsContext";
import AccountContextProvider from "./contexts/AccountContext";
import SubAccountContextProvider from "./contexts/SubAccountContext";
import CustomerContextProvider from "./contexts/CustomersContext";
function App() {
  return (
    <AuthContextProvider>
      <RoomsContextProvider>
        <RoomTypeContextProvider>
          <ChargeContextProvider>
            <BookingsContextProvider>
              <AccountContextProvider>
                <SubAccountContextProvider>
                  <CustomerContextProvider>
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
                              <ProtectedBooking>
                                <Booking />
                              </ProtectedBooking>
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
                              <ProtectedRoom>
                                <Rooms />
                              </ProtectedRoom>
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          exact
                          path="/system-management/charge-calculations"
                          element={
                            <ProtectedRoute>
                              <ProtectedCharge>
                                <Charge />
                              </ProtectedCharge>
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          exact
                          path="/system-management/room-types"
                          element={
                            <ProtectedRoute>
                              <ProtectedRoomType>
                                <RoomType />
                              </ProtectedRoomType>
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          exact
                          path="/system-management/sub-accounts"
                          element={
                            <ProtectedRoute>
                              <ProtectedAdmin>
                                <SubAccount />
                              </ProtectedAdmin>
                            </ProtectedRoute>
                          }
                        />
                      </Routes>
                    </Router>
                  </CustomerContextProvider>
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

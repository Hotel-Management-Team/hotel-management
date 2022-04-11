import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from './components/auth/layout/Landing'
import Auth from "./views/Auth";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route exact path='/login' element={<Auth authRoute='login'/>}/>
        <Route exact path='/register' element={<Auth authRoute='register'/>} />
      </Routes>
    </Router>
  );
}

export default App;

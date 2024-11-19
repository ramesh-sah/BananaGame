import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from './pages/Login';
import Register from './pages/Register';
import Game from './pages/Game';
import Overview from "./components/Overview";
import History from './components/History';
import Playgame from "./components/Playgame";
import Account from "./components/Account";
import Help from './components/Help';



const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} /> {/* Redirect root path to /login */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/game" element={<Game />} />
        <Route path="/game/history" element={<History />}></Route>
        <Route path="/game/overview" element={<Overview />}></Route>
        <Route path="/game/playgame" element={<Playgame />}></Route>
        <Route path="/game/settings" element={<Account />}></Route>
        <Route path="/help" element={<Help />}></Route>


      </Routes>
    </Router>
  );
};

export default App;
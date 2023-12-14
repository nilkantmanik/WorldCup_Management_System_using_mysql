import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from './components/Home';
import Teams from './components/Teams';
import Addteam from './components/Addteam.js';
import Pointstable from './components/Pointstable';
import Players from './components/Players';
import Navbar from './components/Navbar';


function App() {
  return (
    <div className="App">
      <Router>
      <Navbar />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/pointstable' element={<Pointstable />} />
          <Route path='/teams' element={<Teams />} />
          <Route path='/addteam' element={<Addteam />} />
          <Route path='/players/:teamname' element={<Players />} />

          
        </Routes>
      </Router>
    </div>
  );
}

export default App;

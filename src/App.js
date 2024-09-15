import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import About from "./components/About";
import Exit from "./components/Exit";
import Home from "./components/Home";
import Info from "./components/Info";
import Location from "./components/Location";
import Login from "./components/Login";
import Registration from "./components/Registration";
import Signup from "./components/Signup";
import Entry from "./components/Entry";


function App() {
  return (
    <>
     <Router>
      <Routes>
      <Route exact path="/" element={<Home/>}></Route>
        <Route exact path="/about" element={<About/>}></Route>
        <Route exact path="/exit" element={<Exit/>}></Route>
        <Route exact path="/info" element={<Info/>}></Route>
        <Route exact path="/location" element={<Location/>}></Route>
        <Route exact path="/login" element={<Login/>}></Route>
        <Route exact path="/registration" element={<Registration/>}></Route>
        <Route exact path="/signup" element={<Signup/>}></Route>
        <Route exact path="/entry" element={<Entry/>}></Route>
      </Routes>
     </Router>
    </>
  );
}

export default App;

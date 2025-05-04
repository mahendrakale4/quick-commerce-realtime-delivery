import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Signup from './pages/signup';
import Login from './pages/login';
function App() {
  return (
    <Router>
      <div className="App">
        <nav >
          <Link to="/" >Home</Link>
          <Link to="/signup" >  Sign Up</Link>
          <Link to="/login" >  Login</Link>
        </nav>

        <Routes>
          <Route path="/" element={<div><h1>Quick Commerce</h1></div>} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}



export default App;

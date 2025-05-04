import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Signup from './pages/signup';
import Login from './pages/login';
import Orders from './pages/orders';
import Getorders from './pages/getorders';
import Partnersignup from './pages/partnersignup';
import Partnerlogin from './pages/partnerlogin';
import Partnerorders from './pages/partnergetorders';
import Partnerassignedorder from './pages/partnerassignedorder';
function App() {
  return (
    <Router>  
      <div className="App">
        <nav >
          <Link to="/" >Home  /</Link>
          <Link to="/signup" >  Sign Up/</Link>
          <Link to="/login" >  Login  /</Link>
          <Link to="/orders" >  Orders  /</Link>
          <Link to="/getorders" >  GET orders  /</Link>
        </nav>

        <Routes>
          <Route path="/" element={<div><h1>Quick Commerce</h1></div>} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/getorders" element={<Getorders />} />
          <Route path="/partnersignup" element={<Partnersignup />} />
          <Route path="/partnerlogin" element={<Partnerlogin />} />
          <Route path="/partnergetorders" element={<Partnerorders />} />
          <Route path="/partnerassignedorder" element={<Partnerassignedorder />} />
        </Routes>



        <footer>
          <Link to="/partnersignup" >  Partner Sign Up/</Link>
          <Link to="/partnerlogin" >  Partner Login  /</Link>
          <Link to="/partnergetorders" >  Partner GET orders  /</Link>
          <Link to="/partnerassignedorder" >  Partner assigned order  /</Link>
        </footer>
      </div>
    </Router>
  );
}



export default App;

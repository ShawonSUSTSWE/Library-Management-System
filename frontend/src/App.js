import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './component/Navbar';
import Home from './component/Home';
import Login from './component/Login';
import SignUp from './component/SignUp';
import Footer from './component/Footer';

function App() {
  return (
    <div>
     <Router>
       <div className>
       <Navbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
        </Routes>
        </div>
    </Router>
    <Footer />
      </div>   
  )
}

export default App;

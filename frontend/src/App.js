import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './component/Navbar';
import Home from './component/Home';
import Login from './component/Login';
import SignUp from './component/SignUp';
import Footer from './component/Footer';
import ContactUs from './component/ContactUs';
import Overview from './component/Overview';
import BookInfo from './component/BookInfo';
import Menu from './component/Menu';
import AddBook from './component/AddBook';




function App() {
  return (
    <div>
     <Router>
       <div className>
          <Navbar />
          

          <Routes>
            <Route path="/AddBook" element={<AddBook/>}></Route>
            <Route path="/BookInfo" element={<BookInfo />}></Route>
            <Route path="/" element={<Home />}></Route>
           
          <Route path="/login" element={<Login />}></Route>
            <Route path="/Signup" element={<SignUp />}></Route>
            <Route path="/Overview" element={<Overview />}></Route>
            <Route path="/ContactUs" element={<ContactUs />}></Route>          
        </Routes>
        </div>
    </Router>
    <Footer />
      </div>   
  )
}

export default App;


import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Switch, Link } from 'react-router-dom';


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
import New from './src1/New.js';
import React, { Component } from 'react';




function App() {
  return (
    <div className>
      

      <Router>
        <Navbar>

        <Switch>
          <Route path="/" element={<Home />}></Route>
          <Route path="/new" component={<New />}></Route>
          <Route path="/Signup" element={<SignUp />}></Route>
          <Route path="/Overview" element={<Overview />}></Route>
          <Route path="/ContactUs" element={<ContactUs />}></Route>
          
        </Switch>
        </Navbar >
      </Router>
        
      <Footer />




    </div>
  )
}

export default App;

import React from 'react'
import './Footer.css'
import { BsFacebook, BsGoogle, BsInstagram, BsTwitter } from "react-icons/bs";


function Footer() {
  return (
    <div class="footer">
            <div class="container">     
                <div class="row">                       
                    <div class="col-lg-4 col-sm-4 col-xs-12">
                        <div class="single_footer">
                            <h4>About Us</h4>
                            <ul>
                                <li><a href="/Overview">Overview</a></li>
                                <li><a href="#">Location, Maps and Direction</a></li>
                                <li><a href="/ContactUs">Contact Us</a></li>
                            </ul>
                        </div>                   
                        <div class="social_profile">
                            <ul>
                              <li><a href="https://web.facebook.com/our.sust/?_rdc=1&_rdr"><i class=""><BsFacebook /></i></a></li>
                              <li><a href="https://www.sust.edu/"><i class="fab fa-twitter"><BsGoogle /></i></a></li>
                              <li><a href="https://www.instagram.com/explore/tags/shahjalaluniversityofscienceandtechnology/?hl=bn"><i class="fab fa-google-plus-g"><BsInstagram /></i></a></li>
                              <li><a href="#"><i class="fab fa-instagram"><BsTwitter /></i></a></li>
                            </ul>
                        </div>                          
                    </div>         
                </div>                      
            </div>
        </div>
  )
}
export default Footer
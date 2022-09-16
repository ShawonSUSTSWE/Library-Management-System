import React from 'react'
import './Footer.css'

function Footer() {
  return (
    <div class="footer">
            <div class="container">     
                <div class="row">                       
                    <div class="col-lg-4 col-sm-4 col-xs-12">
                        <div class="single_footer">
                            <h4>About Us</h4>
                            <ul>
                                <li><a href="#">Overview</a></li>
                                <li><a href="#">Location, Maps and Direction</a></li>
                                <li><a href="#">Contact Us</a></li>
                            </ul>
                        </div>                   
                        <div class="social_profile">
                            <ul>
                                <li><a href="#"><i class="fab fa-facebook-f"></i></a></li>
                                <li><a href="#"><i class="fab fa-twitter"></i></a></li>
                                <li><a href="#"><i class="fab fa-google-plus-g"></i></a></li>
                                <li><a href="#"><i class="fab fa-instagram"></i></a></li>
                            </ul>
                        </div>                          
                    </div>         
                </div>                      
            </div>
        </div>
  )
}
export default Footer
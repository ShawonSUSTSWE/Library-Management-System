import React from 'react'
import './Footer.css'
import { BsFacebook, BsGoogle, BsInstagram, BsTwitter } from "react-icons/bs";
import { Link } from 'react-router-dom';


function Footer() {
    return (
        <div class="footer"  >
            <div class="fluide" >
                <div class="row"  >
                    <div class="col-lg-4 col-sm-4 col-xs-12">
                        <div class="single_footer">
                            <h4>About Us</h4>
                            <ul>
                                <li><a href="https://www.sust.edu/about">Overview</a></li>
                                <li><a href="https://www.sust.edu/about/location">Location, Maps and Direction</a></li>
                                <li><Link to="/contactus"> Contact Us</Link></li>
                            </ul>
                        </div>
                        <div class="social_profile">
                            <ul>
                                <li><a href="https://web.facebook.com/our.sust/?_rdc=1&_rdr"><i class=""><BsFacebook /></i></a></li>
                                <li><a href="https://www.sust.edu/"><i ><BsGoogle /></i></a></li>
                                <li><a href="https://www.instagram.com/explore/tags/shahjalaluniversityofscienceandtechnology/?hl=bn"><i class="fab fa-google-plus-g"><BsInstagram /></i></a></li>
                                <li><a href="#"><i ><BsTwitter /></i></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Footer
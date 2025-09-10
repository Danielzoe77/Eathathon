import React from 'react'
import logo from "../assets/food.png";

const Footer = () => {
  return (
    <div>
      <footer className="footer xl:px-24 text-base-content px-4 py-10">
  <aside>
     <img src= {logo} className="w-20 h-20"  />
    <p className='my-5 md:w-40'>
    savor the artistry where every dish is a culinary masterpiece
    </p>
  </aside>
  <nav>
    <h6 className="footer-title text-white">USEFUL LINKS</h6>
    <a className="link link-hover">About us</a> 
    <a className="link link-hover">Events</a>
    <a className="link link-hover">Blogs</a>
    <a className="link link-hover">FAQ</a>
  </nav>
  <nav>
    <h6 className="footer-title">COMPANY</h6>
    <a className="link link-hover">About us</a>
    <a className="link link-hover">Contact</a>
    <a className="link link-hover">Jobs</a>
    <a className="link link-hover">Press kit</a>
  </nav>
  <nav>
    <h6 className="footer-title">Legal</h6>
    <a className="link link-hover">Terms of use</a>
    <a className="link link-hover">Privacy policy</a>
    <a className="link link-hover">Cookie policy</a>
  </nav>
</footer>
    </div>
  )
}

export default Footer

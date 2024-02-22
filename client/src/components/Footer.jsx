import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer class="flex flex-col space-y-10 justify-center p-8" style={{backgroundColor:'#263675'}}>
    <nav class="flex justify-center flex-wrap gap-6 text-white font-medium">
        <Link class="hover:text-purple-200" to="/home">Home</Link>
        <Link class="hover:text-purple-200" to="/about">About</Link>
        <Link class="hover:text-purple-200" to="/about">Services</Link>
        <Link class="hover:text-purple-200" to="/sign-up">Register</Link>
        <Link class="hover:text-purple-200" to="/sign-in">Sign-in</Link>
    </nav>

    <div class="flex justify-center space-x-5">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <img loading='lazy' src="https://img.icons8.com/fluent/30/000000/facebook-new.png" />
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <img loading='lazy' src="https://img.icons8.com/fluent/30/000000/linkedin-2.png" />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <img loading='lazy' src="https://img.icons8.com/fluent/30/000000/instagram-new.png" />
        </a>
        <a href="https://messenger.com" target="_blank" rel="noopener noreferrer">
            <img loading='lazy' src="https://img.icons8.com/fluent/30/000000/facebook-messenger--v2.png" />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <img loading='lazy' src="https://img.icons8.com/fluent/30/000000/twitter.png" />
        </a>
    </div>
</footer>
  )
}

export default Footer
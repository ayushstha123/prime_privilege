import React from 'react'

const Footer = () => {
  return (
    <footer class="flex flex-col space-y-10 justify-center  bg-purple-900 p-8">
    <nav class="flex justify-center flex-wrap gap-6 text-white font-medium">
        <a class="hover:text-purple-200" href="/home">Home</a>
        <a class="hover:text-purple-200" href="/about">About</a>
        <a class="hover:text-purple-200" href="/about">Services</a>
        <a class="hover:text-purple-200" href="/sign-up">Register</a>
        <a class="hover:text-purple-200" href="/sign-in">Sign-in</a>
    </nav>

    <div class="flex justify-center space-x-5">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <img src="https://img.icons8.com/fluent/30/000000/facebook-new.png" />
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <img src="https://img.icons8.com/fluent/30/000000/linkedin-2.png" />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <img src="https://img.icons8.com/fluent/30/000000/instagram-new.png" />
        </a>
        <a href="https://messenger.com" target="_blank" rel="noopener noreferrer">
            <img src="https://img.icons8.com/fluent/30/000000/facebook-messenger--v2.png" />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <img src="https://img.icons8.com/fluent/30/000000/twitter.png" />
        </a>
    </div>
</footer>
  )
}

export default Footer
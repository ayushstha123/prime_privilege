import React from 'react'

const Footer = () => {
  return (
    <footer className="flex flex-col justify-center p-8" style={{backgroundColor:'#263675'}}>
        <div className="text-center animate-pulse">
        <h1 className='text-base md:text-2xl text-white font-bold'>Currently,these facilities are exclusive to<span style={{color:'#F4BE40'}}> Prime College</span> students.</h1>
        <p className='text-white md:text-lg text-sm  font-light mt-2'>Please Sign up to get access to all the exclusive discounts available.</p>
    </div>
</footer>
  )
}

export default Footer

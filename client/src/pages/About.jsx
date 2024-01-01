import React from 'react';
import Footer from '../components/Footer';

export default function About() {
    return (
        <div>
            <section className=" py-10 lg:py-20 bg-purple-700 font-poppins ">
                <div className="max-w-6xl py-4 mx-auto lg:py-6 md:px-6">
                    <div className="flex flex-wrap ">
                        <h1 className='md:text-6xl text-4xl p-5 text-white font-poppins font-extrabold'>Welcome to Nepal's Premier Student Discounts Hub</h1>
                        <p className='p-5 font-light text-white'>We understand that being a student comes with its unique set of challenges, and we're here
                            to make your academic journey a little more affordable and a lot more enjoyable. We believe
                            every student deserves access to incredible deals and offers, so we've handpicked the
                            best discounts across all your favorite categories – from food and fashion to entertainment
                            and travel.</p>
                        <div className="w-full px-4 my-10 lg:w-1/2 lg:mb-0 ">
                            <div className="lg:max-w-md">
                                <div className="px-4 pl-4 mb-6 border-l-4 border-white">

                                    <h1 className="mt-2 text-3xl font-gab text-white md:text-5xl font-gab">
                                        About us
                                    </h1>
                                </div>
                                <p className="px-4 mb-10 text-base leading-7 text-white ">
                                    <ul className='text-bold list-disc'>
                                        <li><span className=' font-bold'>Study More, Spend Less : </span>We believe that financial constraints should never stand in the
                                            way of education. Our mission is simple – to help you study more while spending less. By
                                            curating a diverse array of discounts, offers, and deals, we aim to ease the financial burden
                                            on students, allowing you to focus on what truly matters: your education.</li>
                                        <li><span className='font-bold'>Empowering Nepali Students : </span>We take pride in being more than just a discount platform;
                                            we are a community that strives to empower Nepali students. Through our carefully selected
                                            partnerships with leading brands, we ensure that you have access to resources and
                                            experiences that enhance your student life.</li>
                                    </ul>


                                </p>
                                {/* <div className="flex flex-wrap items-center">
                            <div className="w-full px-4 mb-6 sm:w-1/2 md:w-1/2 lg:mb-6">
                            <div className="p-6 bg-white rounded">
                                    <span className="text-indigo-600">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                            fill="currentColor" className="w-10 h-10 bi bi-file-earmark-text" viewBox="0 0 16 16">
                                            <path
                                                d="M5.5 7a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zM5 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5z" />
                                            <path
                                                d="M9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.5L9.5 0zm0 1v2A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5z" />
                                        </svg>
                                    </span>
                                    <p className="mt-4 mb-2 text-3xl font-bold text-gray-700 ">2097
                                    </p>
                                    <h2 className="text-sm text-gray-700 ">Projects and Plans</h2>
                                </div>
                            </div>
                            <div className="w-full px-4 mb-6 sm:w-1/2 md:w-1/2 lg:mb-6">
                                <div className="p-6 bg-white rounded">
                                    <span className="text-indigo-600">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" 
                                            fill="currentColor" className="bi bi-people-fill w-10 h-10" viewBox="0 0 16 16">
                                            <path
                                                d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                                            <path fill-rule="evenodd"
                                                d="M5.216 14A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216z" />
                                            <path d="M4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />
                                        </svg>
                                    </span>
                                    <p className="mt-4 mb-2 text-3xl font-bold text-gray-700 ">3,590
                                    </p>
                                    <h2 className="text-sm text-gray-700 ">Helped students</h2>
                                </div>
                            </div>
                            <div className="w-full px-4 mb-6 sm:w-1/2 md:w-1/2 lg:mb-6">
                                <div className="p-6 bg-white rounded">
                                    <span className="text-indigo-600">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" 
                                            fill="currentColor" className="bi bi-person-fill w-10 h-10" viewBox="0 0 16 16">
                                            <path
                                                d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                                        </svg>
                                    </span>
                                    <p className="mt-4 mb-2 text-3xl font-bold text-gray-700 ">74
                                    </p>
                                    <h2 className="text-sm text-gray-700 ">Teachers</h2>
                                </div>
                            </div>
                            <div className="w-full px-4 mb-6 sm:w-1/2 md:w-1/2 lg:mb-6">
                                <div className="p-6 bg-white rounded">
                                    <span className="text-indigo-600">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" 
                                            fill="currentColor" className="w-10 h-10 bi bi-alarm-fill" viewBox="0 0 16 16">
                                            <path
                                                d="M6 .5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1H9v1.07a7.001 7.001 0 0 1 3.274 12.474l.601.602a.5.5 0 0 1-.707.708l-.746-.746A6.97 6.97 0 0 1 8 16a6.97 6.97 0 0 1-3.422-.892l-.746.746a.5.5 0 0 1-.707-.708l.602-.602A7.001 7.001 0 0 1 7 2.07V1h-.5A.5.5 0 0 1 6 .5zm2.5 5a.5.5 0 0 0-1 0v3.362l-1.429 2.38a.5.5 0 1 0 .858.515l1.5-2.5A.5.5 0 0 0 8.5 9V5.5zM.86 5.387A2.5 2.5 0 1 1 4.387 1.86 8.035 8.035 0 0 0 .86 5.387zM11.613 1.86a2.5 2.5 0 1 1 3.527 3.527 8.035 8.035 0 0 0-3.527-3.527z" />
                                        </svg>
                                    </span>
                                    <p className="mt-4 mb-2 text-3xl font-bold text-gray-700 ">100
                                    </p>
                                    <h2 className="text-sm text-gray-700 ">Timing</h2>
                                </div>
                            </div>
                        </div> */}
                            </div>
                        </div>
                        <div className="w-full px-4  mb-10 lg:w-1/2 lg:mb-0">
                            <img  src="https://prime.edu.np/wp-content/uploads/2023/07/BBA-Program-1024x683.jpg" alt=""
                                className="relative z-1000 object-cover w-full h-full rounded" />
                        </div>
                    </div>
                </div>
            </section>






            <section className="flex items-center py-5 bg-white font-poppins">
                <div className="justify-center flex-1 max-w-6xl px-4 py-4 mx-auto lg:py-6 md:px-6">
                    <div className="flex flex-wrap items-center">
                        <div className="w-full px-4 mb-10 xl:w-1/2 lg:mb-8">
                            <div className="flex flex-wrap">
                                <div className="w-full px-4 md:w-1/2">
                                    <img src="https://prime.edu.np/wp-content/uploads/2023/08/Student-Support-Division-scaled.jpg" alt=""
                                        className="object-cover w-full mb-6 rounded-lg h-80" />
                                    <img src="https://prime.edu.np/wp-content/uploads/2023/07/AYU_3083_pp-scaled.jpg" alt=""
                                        className="object-cover w-full rounded-lg h-80" />
                                </div>
                                <div className="w-full px-4 md:w-1/2 xl:mt-11">
                                    <img src="https://prime.edu.np/wp-content/uploads/2023/08/PCC-1-scaled.jpg" alt=""
                                        className="object-cover w-full mb-6 rounded-lg h-80" />
                                    <img src="https://prime.edu.np/wp-content/uploads/2023/08/ESO-scaled.jpg" alt=""
                                        className="object-cover w-full rounded-lg h-80" />
                                </div>
                            </div>
                        </div>
                        <div className="w-full px-4 mb-10 xl:w-1/2 lg:mb-8">
                            <h2 className="mt-2 mb-4 text-2xl font-bold text-gray-700 ">
                                Why choose us
                            </h2>
                            <p className="mb-4 text-base leading-7 text-gray-500 ">
                                We're passionate about supporting the Nepali student community, and we believe access
                                to great deals shouldn't be a privilege. That's why we're committed to:
                            </p>
                            <ul className="mb-10">
                                <li className="flex items-center mb-4 text-base text-gray-600 ">
                                    <span className="mr-3 text-indigo-600 ">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                            className="w-6 h-6 bi bi-1-circle-fill" viewBox="0 0 16 16">
                                            <path fill-rule="evenodd"
                                                d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0ZM9.283 4.002V12H7.971V5.338h-.065L6.072 6.656V5.385l1.899-1.383h1.312Z" />
                                        </svg>
                                    </span>
                                    Partnering with top brands and businesses to bring you the best possible offers.                        </li>
                                <li className="flex items-center mb-4 text-base text-gray-600 ">
                                    <span className="mr-3 text-indigo-600  ">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                            className="w-6 h-6 bi bi-2-circle-fill" viewBox="0 0 16 16">
                                            <path
                                                d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0ZM6.646 6.24c0-.691.493-1.306 1.336-1.306.756 0 1.313.492 1.313 1.236 0 .697-.469 1.23-.902 1.705l-2.971 3.293V12h5.344v-1.107H7.268v-.077l1.974-2.22.096-.107c.688-.763 1.287-1.428 1.287-2.43 0-1.266-1.031-2.215-2.613-2.215-1.758 0-2.637 1.19-2.637 2.402v.065h1.271v-.07Z" />
                                        </svg>
                                    </span>
                                    Building a user-friendly platform that's easy to navigate and explore.                        </li>
                                <li className="flex items-center mb-4 text-base text-gray-600 ">
                                    <span className="mr-3 text-indigo-600 ">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                            className="w-6 h-6 bi bi-3-circle-fill" viewBox="0 0 16 16">
                                            <path
                                                d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0Zm-8.082.414c.92 0 1.535.54 1.541 1.318.012.791-.615 1.36-1.588 1.354-.861-.006-1.482-.469-1.54-1.066H5.104c.047 1.177 1.05 2.144 2.754 2.144 1.653 0 2.954-.937 2.93-2.396-.023-1.278-1.031-1.846-1.734-1.916v-.07c.597-.1 1.505-.739 1.482-1.876-.03-1.177-1.043-2.074-2.637-2.062-1.675.006-2.59.984-2.625 2.12h1.248c.036-.556.557-1.054 1.348-1.054.785 0 1.348.486 1.348 1.195.006.715-.563 1.237-1.342 1.237h-.838v1.072h.879Z" />
                                        </svg>
                                    </span>
                                    Providing helpful resources and information to empower you to make smart
                                    financial choices.                        </li>

                            </ul>

                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-indigo-600">
                <div className="gap-16 items-center py-8 px-5 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-16">
                    <div className="font-light text-white sm:text-lg">
                        <h2 className="mb-4 text-4xl font-gab tracking-tight font-extrabold text-white">Join the Savings Revolution</h2>
                        <p className="mb-4">Ready to embark on a journey where every click leads to
                            savings and every deal is handpicked for you?</p>

                        <p className='mb-4'> Join us as your one-stop shop for student
                            savings and become part of the savings revolution. Your academic experience is about to get
                            a whole lot better!

                        </p>

                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-8">
                        <img className="w-full rounded-lg" src="https://prime.edu.np/wp-content/uploads/2023/07/AYU_2673_pp-scaled.jpg" alt="student 1" />
                        <img className="mt-4 w-full lg:mt-10 rounded-lg" src="https://prime.edu.np/wp-content/uploads/2023/08/sports-scaled.jpg" alt="student2" />
                    </div>
                </div>
            </section>


            <section className="bg-purple-700">
                <div className="gap-16 items-center py-8 px-5 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-16">
                    <div className="font-light text-white sm:text-lg">
                        <h2 className="mb-4 text-4xl font-gab tracking-tight font-extrabold text-white">We're not just a platform</h2>


                        <p className='mb-4'>
                            We're not just a platform; we're your ally in navigating the world of student life with a little
                            more ease and a lot more savings. Welcome aboard!
                        </p>
                    </div>
                    <div className="grid  mt-8">
                        <img className="w-full rounded-lg" src="https://prime.edu.np/wp-content/uploads/2023/08/Library-2-scaled.jpg" alt="student 1" />
                    </div>
                </div>
            </section>
<Footer/>

        </div>
    );
}

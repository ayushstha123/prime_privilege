import React from 'react'

const samyakErrorImg = ev => {
    ev.target.src = "./src/assests/images/samyak_alt.jpg"
 }

const OurTeam = () => {
    return (
        <div>
            <section className="bg-white">
                <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 ">
                    <div className="mx-auto max-w-screen-sm text-center mb-8 lg:mb-16">
                        <h2 className="mb-4 text-4xl tracking-tight font-extrabold" style={{color:'#263675'}}>Our Team</h2>
                    </div>
                    <div className="grid gap-8 mb-6 lg:mb-16 md:grid-cols-2">
                        <div className="items-cente rounded-lg sm:flex shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 md:shadow-xl md:shadow-indigo-500/40 md:hover:shadow-lg md:hover:shadow-indigo-500/80 cursor-pointer transition hover:scale-105" style={{ backgroundColor: '#263675' }}>
                            <div class="w-full h-auto">
                                <img class="md:rounded-none rounded-full w-40 h-40 mx-auto mt-5 md:m-0 md:object-center object-cover md:w-full md:h-full" src="./src/assests/images/ayush.jpeg" alt="Bonnie Avatar" />
                            </div>

                            <div className="p-5 md:text-start text-center bg-white">
                                <h3 className="text-xl font-bold tracking-tight" style={{color:'#263675'}}>
                                    <a href="#">Ayush Shrestha</a>
                                </h3>
                                <span className='font-semibold'style={{color:'#263675'}}>Front-end and Backend developer</span>
                                <p className="mt-3 mb-4 font-normal text-black text-sm text-justify md:text-start">Ayush Shrestha handles front and back-end development of the website. He is a web designer and a student at Prime College.</p>
                                <ul className="md:justify-start justify-center flex space-x-4 sm:mt-0">
                                    <li>
                                        <a target="_blank" href="https://www.linkedin.com/in/ayushshrestha36/" className=" hover:text-white" style={{color:'#263675'}}>
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 54 54" aria-hidden="true"><path fill-rule="evenodd" d="M41,4H9C6.24,4,4,6.24,4,9v32c0,2.76,2.24,5,5,5h32c2.76,0,5-2.24,5-5V9C46,6.24,43.76,4,41,4z M17,20v19h-6V20H17z M11,14.47c0-1.4,1.2-2.47,3-2.47s2.93,1.07,3,2.47c0,1.4-1.12,2.53-3,2.53C12.2,17,11,15.87,11,14.47z M39,39h-6c0,0,0-9.26,0-10 c0-2-1-4-3.5-4.04h-0.08C27,24.96,26,27.02,26,29c0,0.91,0,10,0,10h-6V20h6v2.56c0,0,1.93-2.56,5.81-2.56 c3.97,0,7.19,2.73,7.19,8.26V39z" clip-rule="evenodd" /></svg>
                                        </a>
                                    </li>

                                    <li>
                                        <a target="_blank" href="https://github.com/ayushstha123" className=" hover:text-white" style={{color:'#263675'}}>
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" /></svg>
                                        </a>
                                    </li>
                                    <li>
                                        <a target="_blank" href="https://twitter.com/AyushShrestha69" className=" hover:text-white" style={{color:'#263675'}}>
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
                                        </a>
                                    </li>
                                    <li>

                                        <a target="_blank" href="https://instagram.com/shre_shes/" className=" hover:text-white" style={{color:'#263675'}}>
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 54 54" aria-hidden="true"><path fill-rule="evenodd" d="M 16 3 C 8.83 3 3 8.83 3 16 L 3 34 C 3 41.17 8.83 47 16 47 L 34 47 C 41.17 47 47 41.17 47 34 L 47 16 C 47 8.83 41.17 3 34 3 L 16 3 z M 37 11 C 38.1 11 39 11.9 39 13 C 39 14.1 38.1 15 37 15 C 35.9 15 35 14.1 35 13 C 35 11.9 35.9 11 37 11 z M 25 14 C 31.07 14 36 18.93 36 25 C 36 31.07 31.07 36 25 36 C 18.93 36 14 31.07 14 25 C 14 18.93 18.93 14 25 14 z M 25 16 C 20.04 16 16 20.04 16 25 C 16 29.96 20.04 34 25 34 C 29.96 34 34 29.96 34 25 C 34 20.04 29.96 16 25 16 z" clip-rule="evenodd" /></svg>
                                        </a>
                                    </li>

                                </ul>
                            </div>
                        </div>

                        <div className="items-cente rounded-lg sm:flex shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 md:shadow-xl md:shadow-indigo-500/40 md:hover:shadow-lg md:hover:shadow-indigo-500/80 cursor-pointer transition hover:scale-105" style={{ backgroundColor: '#263675' }}>
          <div class="w-full h-auto">
                    <img class="md:rounded-none rounded-full w-40 h-40 mx-auto mt-5 md:m-0 md:object-center object-cover md:w-full md:h-full" src="./src/assests/images/samyak.jpg" alt="Samyak" onError={samyakErrorImg}/>
                </div>
            
              <div className="p-5 md:text-start text-center bg-white">
              <h3 className="text-xl font-bold tracking-tight" style={{color:'#263675'}}>
                      <a href="#">Samyak Maharjan</a>
                  </h3>
                  <span className='font-semibold'style={{color:'#263675'}}>UI/UX designer</span>
                  <p className="mt-3 mb-4 font-normal text-black text-sm text-justify md:text-start">Samyak Maharjan handles UI/UX design of the website. He is a student at Prime College. Works on Mandala System Pvt. Ltd. as Project Manager and Full stack developer with DevOps.</p>
                  <ul className="md:justify-start justify-center flex space-x-4 sm:mt-0">
                      <li>
                          <a target="_blank" href="https://www.linkedin.com/in/samyak-maharjan" className=" hover:text-white" style={{color:'#263675'}}>
                              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 54 54" aria-hidden="true"><path fill-rule="evenodd" d="M41,4H9C6.24,4,4,6.24,4,9v32c0,2.76,2.24,5,5,5h32c2.76,0,5-2.24,5-5V9C46,6.24,43.76,4,41,4z M17,20v19h-6V20H17z M11,14.47c0-1.4,1.2-2.47,3-2.47s2.93,1.07,3,2.47c0,1.4-1.12,2.53-3,2.53C12.2,17,11,15.87,11,14.47z M39,39h-6c0,0,0-9.26,0-10 c0-2-1-4-3.5-4.04h-0.08C27,24.96,26,27.02,26,29c0,0.91,0,10,0,10h-6V20h6v2.56c0,0,1.93-2.56,5.81-2.56 c3.97,0,7.19,2.73,7.19,8.26V39z" clip-rule="evenodd" /></svg>
                          </a>
                      </li>
                     
                      <li>
                      <a target="_blank" href="https://github.com/samyeak-m" className=" hover:text-white" style={{color:'#263675'}}>
                              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" /></svg>
                          </a>
                      </li>
                      <li>
                      <a target="_blank" href="https://x.com/SamyeakM" className=" hover:text-white" style={{color:'#263675'}}>
                              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
                          </a>
                      </li>
                      <li>
                        
                      <a target="_blank" href="https://www.instagram.com/sam_yaek/" className=" hover:text-white" style={{color:'#263675'}}>
                              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 54 54" aria-hidden="true"><path fill-rule="evenodd" d="M 16 3 C 8.83 3 3 8.83 3 16 L 3 34 C 3 41.17 8.83 47 16 47 L 34 47 C 41.17 47 47 41.17 47 34 L 47 16 C 47 8.83 41.17 3 34 3 L 16 3 z M 37 11 C 38.1 11 39 11.9 39 13 C 39 14.1 38.1 15 37 15 C 35.9 15 35 14.1 35 13 C 35 11.9 35.9 11 37 11 z M 25 14 C 31.07 14 36 18.93 36 25 C 36 31.07 31.07 36 25 36 C 18.93 36 14 31.07 14 25 C 14 18.93 18.93 14 25 14 z M 25 16 C 20.04 16 16 20.04 16 25 C 16 29.96 20.04 34 25 34 C 29.96 34 34 29.96 34 25 C 34 20.04 29.96 16 25 16 z" clip-rule="evenodd" /></svg>
                          </a>
                      </li>
                   
                  </ul>
              </div>
          </div> 

                    </div>
                </div>
            </section>
        </div>
    )
}

export default OurTeam
import React from 'react'
import LoginImg from '../../assets/login.jpeg'
import googleImg from '../../assets/google_logo_icon.png'
import Login from './Login'
import Signup from './Signup'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'

export default function Authentication() {

    const navigator = useNavigate();

    // Function to determine if a route is active
    const isActive = (path) => location.pathname === path;

  return (
        <div className="w-full h-screen flex items-center justify-center">
            <div className="bg-[#7ad3f62a] flex rounded-2xl shadow-lg max-w-3xl p-4">
        
                <div className="sm:w-1/2 px-16">
                    
                    <Routes>
                        <Route path="/" element={<Login/>}></Route>
                        <Route path="/register" element={<Signup/>}></Route>
                    </Routes>
                    {/* <Signup/> */}

                    <div className="mt-10 grid grid-cols-3 items-center text-gray-400">
                        <hr className="border-gray-400"/>
                        <p className="text-center text-sm">OR</p>
                        <hr className="border-gray-400"/>
                    </div>

                    <button className="bg-white border py-2 w-full rounded-xl mt-5 flex justify-center text-sm">
                        <img className="w-6 mr-3" src={googleImg} alt=""/>                
                        Login with Google
                    </button>

                    {/* <p className="mt-5 text-xs border-b border-gray-400 py-4">
                    <a className='hover:text-blue-600' href="">Forgot Your password?</a>
                    </p> */}

                    <div className="mt-3 text-xs flex justify-between items-center">
                        <p>
                            <a href="#">If you dont't have an account?</a>
                        </p>
                        <button className="py-2 px-5 bg-white border rounded-xl" onClick={() => navigator("/register")}>
                            Register
                        </button>
                    </div>
                </div>

                <div className="sm:block hidden w-1/2">
                    <img className="sm:block hidden rounded-2xl" src={LoginImg} alt="img-login"/>
                </div>
            </div>
        </div>
  )
}

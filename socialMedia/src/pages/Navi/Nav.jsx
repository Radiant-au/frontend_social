import React from 'react'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSelector } from 'react-redux'

const Nav = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <nav className='fixed w-full bg-white py-2 shadow-md z-10'>
      <div className="w-4/5 mx-auto flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-900">
          Nexus
        </h2>
        <div className="flex items-center bg-gray-100 rounded-full px-3 py-2">
            <FontAwesomeIcon icon={faMagnifyingGlass} className='text-gray-400' />
          <input 
            type="search" 
            placeholder="Search for creators, inspirations, and projects"
            className="bg-transparent ml-4 w-30 py-1 focus:outline-none text-sm text-gray-700 placeholder-gray-400"
          />
        </div>
        <div className="flex items-center gap-6">
          <label className="btn-primary px-10 py-2 rounded-4xl bg-violet-500 text-white cursor-pointer">
            Create
          </label>
          <div className="profile-photo w-12 h-12 rounded-full overflow-hidden">
            <img src={user.profileImg} alt="Profile" className="w-full h-full object-cover"/>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Nav
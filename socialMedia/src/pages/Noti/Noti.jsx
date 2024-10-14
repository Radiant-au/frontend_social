import React from 'react'
import SideBar from '../Navi/SideBar'
import Nav from '../Navi/Nav'


const Noti = () => {
  return (
    <>
        <Nav/>    
        <div className='w-4/5 mx-auto relative top-20'>
            <div className='grid grid-cols-[18vw_minmax(0,1fr)_20vw] gap-x-8 relative'>
                <SideBar />
            </div>
        </div>
    </>
  )
}

export default Noti
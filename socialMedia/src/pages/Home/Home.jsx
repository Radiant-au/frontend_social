import React, { useEffect, useState } from 'react'
import Nav from '../Navi/Nav'
import SideBar from '../Navi/SideBar'
import MiddleContent from './MiddleContent'
import Popup from './Popup'
import SuggestBox from '../Navi/SuggestBox'



const Home = () => {

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleCommentClick = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };
  
  return (
    <>
        <Nav/>    
        <div className='w-4/5 mx-auto relative top-20'>
            <div className='grid grid-cols-[18vw_minmax(0,1fr)_20vw] gap-x-8 relative'>
                <SideBar />
                <MiddleContent onCommentClick={handleCommentClick} />
                <SuggestBox/>
            </div>
        </div>
        {isPopupOpen && <Popup onClose={handleClosePopup} />}
    </>

  )
}

export default Home
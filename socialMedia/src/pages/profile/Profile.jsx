import React from 'react';
import Nav from '../Navi/Nav';
import SideBar from '../Navi/SideBar';
import User from './User';
import SuggestBox from '../Navi/SuggestBox';



const Profile = () => {

  
  return (
    
    <>
      <Nav/>    
        <div className='w-4/5 mx-auto relative top-20'>
            <div className='grid grid-cols-[18vw_minmax(0,1fr)_12vw] gap-x-8 relative'>
                <SideBar />
                <User />
                <SuggestBox/>
            </div>
        </div>
    </>
  );
};

export default Profile;

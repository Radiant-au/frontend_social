import React , { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight , faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import profile1 from "../../assets/images/profile-8.jpg"
import profile2 from "../../assets/images/profile-9.jpg"
import profile3 from "../../assets/images/profile-10.jpg"
import profile4 from "../../assets/images/profile-11.jpg"
import profile5 from "../../assets/images/profile-12.jpg"
import profile6 from "../../assets/images/profile-13.jpg"
import profile7 from "../../assets/images/profile-14.jpg"
import profile8 from "../../assets/images/profile-15.jpg"

const Stories = () => {
  const stories = [
    { img: profile1 , name: "Your Story" },
    { img: profile2 , name: "Lilla James" },
    { img: profile3, name: "Winnie Hale" },
    { img: profile4 , name: "Daniel Bale" },
    { img: profile5 , name: "Jane Doe" },
    { img: profile6 , name: "Tina White" },
    { img: profile7 , name: "Tina White" },
    { img: profile8 , name: "Tina White" },
  ];


  const storiesRef = useRef(null);

  // Scroll Left
  const scrollLeft = () => {
    if (storiesRef.current) {
      storiesRef.current.scrollBy({
        left: -300, // Adjust scroll amount
        behavior: 'smooth',
      });
    }
  };

  // Scroll Right
  const scrollRight = () => {
    if (storiesRef.current) {
      storiesRef.current.scrollBy({
        left: 300, // Adjust scroll amount
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="relative flex items-center">
      {/* Left Carousel Icon */}
      <button className="absolute left-0 top-6" onClick={scrollLeft}>
        <FontAwesomeIcon icon={faChevronLeft} className="text-2xl text-violet-500" />
      </button>

      {/* Stories Container */}
      <div className="flex space-x-4 overflow-x-auto no-scrollbar py-2 px-6" ref={storiesRef}>
        {stories.map((story, index) => (
          <div key={index} className="story text-center cursor-pointer">
            <div className="profile-photo w-16 h-16 rounded-full overflow-hidden mb-2 border-2 border-violet-500">
              <img src={story.img} alt={story.name} className="w-full h-full object-cover" />
            </div>
          </div>
        ))}
      </div>

      {/* Right Carousel Icon */}
      <button className="absolute right-0 top-6" onClick={scrollRight}>
        <FontAwesomeIcon icon={faChevronRight} className="text-2xl text-violet-500" />
      </button>
    </div>
  );
};

export default Stories;

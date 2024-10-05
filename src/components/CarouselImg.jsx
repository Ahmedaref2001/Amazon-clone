import React, { useState } from 'react'
import homeImg1 from "../images/backgroundImg/401726683438.jpg";
import homeImg2 from "../images/backgroundImg/401726683587.jpg";
import homeImg3 from "../images/backgroundImg/home-img.jpg";
import homeImg4 from "../images/backgroundImg/401726683988.jpg";
import homeImg5 from "../images/backgroundImg/401726684046.jpg";
import homeImg6 from "../images/backgroundImg/401726684230.jpg";
import '../style/carouselStyle.css'
import { Carousel } from 'react-bootstrap';

const CarouselImg = () => {
    const [index, setIndex] = useState(0);
  
    const handleSelect = (selectedIndex) => {
      setIndex(selectedIndex);
    };
  return (
   <>
    <Carousel activeIndex={index} onSelect={handleSelect}>
          <Carousel.Item>
            <img src={homeImg1} alt="img" className="w-100"/>
          </Carousel.Item>
          <Carousel.Item>
            <img src={homeImg2} alt="Second slide" className="w-100"/>
          </Carousel.Item>
          <Carousel.Item>
            <img src={homeImg3} alt="Third slide" className="w-100"/>
          </Carousel.Item>
          <Carousel.Item>
            <img src={homeImg4} alt="Third slide" className="w-100"/>
          </Carousel.Item>
          <Carousel.Item>
            <img src={homeImg5} alt="Third slide" className="w-100"/>
          </Carousel.Item>
          <Carousel.Item>
            <img src={homeImg6} alt="Third slide" className="w-100"/>
          </Carousel.Item>
        </Carousel>
   </>
  )
}

export default CarouselImg
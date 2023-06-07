import React from 'react'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import slide1 from '../../asstes/images/slider-image-1.jpeg'
import slide2 from '../../asstes/images/slider-image-2.jpeg'
import slide3 from '../../asstes/images/slider-image-3.jpeg'

import banner1 from '../../asstes/images/slider-2.jpeg'
import banner2 from '../../asstes/images/grocery-banner.png'
import banner3 from '../../asstes/images/grocery-banner-2.jpeg'

export default function MainSlider() {
    return (
        <div className='row g-0'>

            <div className='col-md-9'>
                {/* <img height={400} src={slide1} className='w-100' alt="" /> */}


                 <OwlCarousel className='owl-theme' items={1} loop >
                    <img height={400} src={slide1} className='w-100' alt="" />
                    <img height={400} src={slide2} className='w-100' alt="" />
                    <img height={400} src={banner2} className='w-100' alt="" />
                    <img height={400} src={slide3} className='w-100' alt="" />
                    <img height={400} src={banner1} className='w-100' alt="" />
                    {/* <img height={400} src={banner3} className='w-100' alt="" /> */}
                </OwlCarousel> 

                
            </div>
            <div className='col-md-3'>
                <img height={200} src={slide2} className='w-100' alt="" />
                <img height={200} src={slide3} className='w-100' alt="" />
            </div>
        </div>
    )
}

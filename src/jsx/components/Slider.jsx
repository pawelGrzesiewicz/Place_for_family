import React, {useRef, useState} from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import {SlLike} from "react-icons/sl";
import {LiaMapMarkedSolid} from "react-icons/lia";

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';


import {EffectCoverflow, Pagination} from 'swiper/modules';
import useDayNightMode from "../hooks/useDayNightMode.js";

export default function Slider({data}) {

    const formsOfEntertainment = data
    const {getDayNightColors} = useDayNightMode();

    console.log(formsOfEntertainment)
    return (
        <>
            <Swiper
                effect={'coverflow'}
                grabCursor={false}
                centeredSlides={true}
                slidesPerView={'auto'}
                coverflowEffect={{
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: false,
                }}
                pagination={false}
                modules={[EffectCoverflow, Pagination]}
                className="mySwiper"
            >
                {formsOfEntertainment && formsOfEntertainment.map((form) =>

                    <SwiperSlide className='swiper-slide'>

                        <h2 className={`swiper-slide__hdl swiper-slide__hdl--${getDayNightColors()}`}>{form.name}</h2>

                        {form && form === 'active' ? (
                            <img src='./src/assets/active.jpg' alt="Active img"/>
                        ) : (
                            <div>No image available</div>
                        )}

                        <div className='icons'>
                            <SlLike className={`icon icon--${getDayNightColors()}`}/>
                            <LiaMapMarkedSolid className={`icon icon--${getDayNightColors()}`}/>
                        </div>
                    </SwiperSlide>
                )}
            </Swiper>
        </>
    );
}

import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { PiThumbsUpLight } from "react-icons/pi";
import { PiMapPinLight } from "react-icons/pi";
import { PiListPlusLight } from "react-icons/pi";

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

import { EffectCoverflow, Pagination } from 'swiper/modules';
import useDayNightMode from '../hooks/useDayNightMode.js';

export default function Slider({ data }) {
    const formOfRecreation = data;
    const { getDayNightColors } = useDayNightMode();
    const [likedForms, setLikedForms] = useState({});

    const handleLikeClick = (formId) => {
        setLikedForms((prevLikedForms) => {
            return { ...prevLikedForms, [formId]: !prevLikedForms[formId] };
        });
    };

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
                {formOfRecreation?.map((form) => (
                    <SwiperSlide key={form.id} className="swiper-slide">
                        <h2 className={`swiper-slide__hdl swiper-slide__hdl--${getDayNightColors()}`}>{form.name}</h2>
                        <img
                            style={{ height: '200px' }}
                            src={`./src/assets/${form.name.toLowerCase()}.jpg`}
                            alt={`${form.name} img`}
                        />
                        <div className="icons">
                            <PiThumbsUpLight
                                className={`icon icon--${getDayNightColors()} ${likedForms[form.id] ? `liked--${getDayNightColors()}` : ''}`}
                                onClick={() => handleLikeClick(form.id)}
                            />
                            <PiListPlusLight className={`icon icon--${getDayNightColors()}`} />
                            <PiMapPinLight className={`icon icon--${getDayNightColors()}`} />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    );
}
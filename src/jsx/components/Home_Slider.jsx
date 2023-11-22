import React from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import {PiThumbsUpLight, PiMapPinLight, PiListPlusLight} from "react-icons/pi";
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import {EffectCoverflow, Pagination} from 'swiper/modules';
import useDayNightMode from '../hooks/useDayNightMode.js';
import {updateLikedStatus} from "../../api/supabase.js";
import {Link} from "react-router-dom";


export default function Home_Slider({data, likedData, onLikeClick}) {
    const formOfRecreation = data;
    const {getDayNightColors} = useDayNightMode();


    const handleLikeClick = async (formId) => {
        await updateLikedStatus('active', formId, !likedData.find((likedForm) => likedForm.id === formId && likedForm.liked));
        onLikeClick(formId);
    };

    const handleMapClick = () => {

    }


    return (
        <div className='slider'>
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
                            src={`./src/assets/${form.name.toLowerCase()}.jpg`}
                            alt={`${form.name} img`}
                        />
                        <div className="icons">
                            <PiThumbsUpLight
                                className={`icon icon--${getDayNightColors()} ${likedData && likedData.find((likedForm) => likedForm.id === form.id && likedForm.liked) ? `liked--${getDayNightColors()}` : ''}`}
                                onClick={() => handleLikeClick(form.id)}
                            />
                            <PiListPlusLight className={`icon icon--${getDayNightColors()}`}/>
                            <Link to="/map">
                                <PiMapPinLight
                                    className={`icon icon--${getDayNightColors()}`}
                                />
                            </Link>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
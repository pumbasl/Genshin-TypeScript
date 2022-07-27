import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from "swiper";
import { Badge } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

// Import Swiper styles
import "swiper/scss";
import "swiper/scss/pagination";
import "swiper/scss/navigation";
import "./styles.scss";

const EventsCarousel = () => {
    const { t } = useTranslation();
    return(
        <div>
            <h4>
                <b>Игровые события:</b>
            </h4>

            <Swiper
                slidesPerView={"auto"}
                centeredSlides={true}
                spaceBetween={30}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[ Pagination, Navigation ]}
            >
                {
                    data.map((el) => (
                        <SwiperSlide>
                            <div className="SliderContainer">
                                <a href="#">
                                    <img src={el.img} />

                                    <span className='DateContainer'>
                                        <Badge bg='purple'>t{'Время события:'} 01.01.2022 - 07.02.2022</Badge>
                                    </span>
                                </a>
                            </div>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>
    );
}

export default EventsCarousel;
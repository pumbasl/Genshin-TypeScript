import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from "swiper";
import { Badge } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import useMediaQuery from '../../hooks/useMediaQuery';

import ExampleImg from '../../media/hidden_strife.jpg';

// Import Swiper styles
import "swiper/scss";
import "swiper/scss/pagination";
import "swiper/scss/navigation";
import "./styles.scss";

const EventsCarousel = () => {
    const { t } = useTranslation();
    const matches = useMediaQuery('(min-width: 768px)')
    
    return(
        <div>
            <h4>
                <b>{t('Игровые события:')}</b>
            </h4>

            <Swiper
                slidesPerView={"auto"}
                centeredSlides={true}
                spaceBetween={30}
                loop={true}
                pagination={{
                    clickable: true,
                }}
                navigation={matches}
                modules={[ Pagination, Navigation ]}
            >
                <SwiperSlide>
                    <div className="SliderContainer">
                        <a href="#">
                            <img src={ExampleImg} alt="eventIMG"  />

                            <span className='DateContainer'>
                                { matches ? (<Badge bg='purple'>{t('Время события:')} 01.01.2022 - 07.02.2022</Badge>) : null }
                            </span>
                        </a>
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <div className="SliderContainer">
                        <a href="#">
                            <img src={ExampleImg} alt="eventIMG"  />

                            <span className='DateContainer'>
                                { matches ? (<Badge bg='purple'>{t('Время события:')} 01.01.2022 - 07.02.2022</Badge>) : null }
                            </span>
                        </a>
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <div className="SliderContainer">
                        <a href="#">
                            <img src={ExampleImg} alt="eventIMG"  />

                            <span className='DateContainer'>
                                { matches ? (<Badge bg='purple'>{t('Время события:')} 01.01.2022 - 07.02.2022</Badge>) : null }
                            </span>
                        </a>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    );
}

export default EventsCarousel;

// {
//     data.map((el) => (
//         <SwiperSlide>
//             <div className="SliderContainer">
//                 <a href="#">
//                     <img src={el.img} />

//                     <span className='DateContainer'>
//                         <Badge bg='purple'>t{'Время события:'} 01.01.2022 - 07.02.2022</Badge>
//                     </span>
//                 </a>
//             </div>
//         </SwiperSlide>
//     ))
// }
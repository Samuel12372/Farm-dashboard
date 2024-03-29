import './LandPlotSelect.css';
import React, { useContext } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { selectedLandPlotContext } from '../../pages/LandPlots';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { EffectCoverflow, Navigation } from 'swiper';

import slide_image_1 from "./assets/P1.jpg";
import slide_image_2 from "./assets/P2.jpg";
import slide_image_3 from "./assets/P3.jpg";
import slide_image_4 from "./assets/P4.jpg";
import slide_image_5 from "./assets/P5.jpg";
import slide_image_6 from "./assets/P6.jpg";
import slide_image_7 from "./assets/P7.jpg";
import slide_image_8 from "./assets/P8.jpg";
import slide_image_9 from "./assets/P9.jpg";
import slide_image_10 from "./assets/P10.jpg";

function LandPlotSelect(){
  const {selectedLandPlot, setSelectedLandPlot} = useContext(selectedLandPlotContext);
  console.log(selectedLandPlot);
  return(
    <div class="LandPlotSelect_box fill_in_box">
      <Swiper
        effect={ 'coverflow' }
        grabCursor={ true }
        centeredSlides={ true }
        loop={ true }
        slidesPerView={ 'auto' }
        onRealIndexChange={(swiper) => {setSelectedLandPlot(swiper.realIndex+1)}}
        coverflowEffect={
          {
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2.5,
          } }
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
            clickable: true,
          }}
          modules={[EffectCoverflow, Navigation]}
          className='swiper_container'
      >
      <SwiperSlide>
        <img src={slide_image_1} alt="slide_image" />
        <figcaption>
            Land Plot 1
        </figcaption>
      </SwiperSlide>
      <SwiperSlide>
        <img src={slide_image_2} alt="slide_image" />
        <figcaption>
            Land Plot 2
        </figcaption>
      </SwiperSlide>
      <SwiperSlide>
        <img src={slide_image_3} alt="slide_image" />
        <figcaption>
            Land Plot 3
        </figcaption>
      </SwiperSlide>
      <SwiperSlide>
        <img src={slide_image_4} alt="slide_image" />
        <figcaption>
            Land Plot 4
        </figcaption>
      </SwiperSlide>
      <SwiperSlide>
        <img src={slide_image_5} alt="slide_image" />
        <figcaption>
            Land Plot 5
        </figcaption>
      </SwiperSlide>
      <SwiperSlide>
        <img src={slide_image_6} alt="slide_image" />
        <figcaption>
            Land Plot 6
        </figcaption>
      </SwiperSlide>
      <SwiperSlide>
        <img src={slide_image_7} alt="slide_image" />
        <figcaption>
            Land Plot 7
        </figcaption>
      </SwiperSlide>
      <SwiperSlide>
        <img src={slide_image_8} alt="slide_image" />
        <figcaption>
            Land Plot 8
        </figcaption>
      </SwiperSlide>
      <SwiperSlide>
        <img src={slide_image_9} alt="slide_image" />
        <figcaption>
            Land Plot 9
        </figcaption>
      </SwiperSlide>
      <SwiperSlide>
        <img src={slide_image_10} alt="slide_image" />
        <figcaption>
            Land Plot 10
        </figcaption>
      </SwiperSlide> 
      <div className="slider-controler">
        <div className="swiper-button-prev slider-arrow">
          <img src="/Images/App/rightArrow.png" name="arrow-back"></img>
        </div>
        <div className="swiper-button-next slider-arrow">
          <img src="/Images/App/rightArrow.png" name="arrow-forward"></img>
        </div>
      </div>
      </Swiper>
    </div>
  );
}

export default LandPlotSelect;
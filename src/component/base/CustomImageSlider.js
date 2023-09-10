import React, { useEffect, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
// import required modules
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";
import { styled } from "styled-components";

const SwiperContainer = styled("div")`
  .swiper {
    width: 100%;
    padding-top: 50px;
    padding-bottom: 50px;
  }

  .swiper-slide {
    background-position: center;
    background-size: cover;
    width: 300px;
  }

  .swiper-slide img {
    display: block;
    width: 100%;
  }

  .content {
    display: flex;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .title {
      font-size: 22px;
      line-height: 28px;
      margin: 0 0 8px;
      font-weight: 400;
      color: #6b9876;
      text-align: center;

    }

    .description {
      margin: 0 0 16px;
      line-height: 22px;
      font-size: 14px;
      text-align: center;

    }
  }
`;

export default function CustomImageSlider(props) {
  const { listBook } = props;
  const [currentBook, setCurrentBook] = useState(listBook[0]);
  return (
    <SwiperContainer>
      <div>
        <Swiper
          onSlideChange={(swiper) => {
            setCurrentBook(swiper.realIndex)
          }}
          effect={"coverflow"}
          grabCursor={true}
          slidesPerView={3}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={true}
          modules={[EffectCoverflow, Pagination, Autoplay]}
          className="mySwiper"
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          centeredSlides={false}
          centerInsufficientSlides={true}
          loop={true}
        >
          {(listBook || [])?.map((item) => (
            <SwiperSlide>
              <img src={item.img} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="content">
        <h2 className="title">{listBook[currentBook]?.title}</h2>
        <p className="description">
          Tác giả <span>{listBook[currentBook]?.title}</span>
        </p>
        {/* <Button variant="text">Xem chi tiết</Button> */}
      </div>
    </SwiperContainer>
  );
}

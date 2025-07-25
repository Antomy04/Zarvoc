import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const slides = [
  {
    src: 'https://wallpaperaccess.com/full/5460857.jpg',
    alt: 'Slide 1',
  },
  {
    src: 'https://static.vecteezy.com/system/resources/previews/002/497/872/non_2x/online-shopping-store-with-mobile-application-digital-marketing-and-sale-banner-background-free-vector.jpg',
    alt: 'Slide 2',
  },
  {
    src: 'https://www.hilaryradley.com/cdn/shop/files/HR-EOS-1200x600-EN.gif?v=1704291394&width=900',
    alt: 'Slide 3',
  },
  {
    src: 'https://img.freepik.com/premium-vector/elegant-modern-sports-banner-sport-shopping-store-vector-template_115083-353.jpg?w=1380',
    alt: 'Slide 3',
  },
  {
    src: 'https://cmsimages.shoppersstop.com/GIF_Colour_Pop_SS_Web_cc91c55982/GIF_Colour_Pop_SS_Web_cc91c55982.gif',
    alt: 'Slide 5',
  },
];

const PromotionalBanner = () => {
  return (
    <section className="w-full bg-black">
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        loop={true}
        speed={800}
        className="mySwiper"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-[500px] md:h-[600px] flex justify-center items-center overflow-hidden">
              <img
                src={slide.src}
                alt={slide.alt}
                className="w-full h-full object-cover object-center"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default PromotionalBanner;

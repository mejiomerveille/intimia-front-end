"use client";
import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.min.css';
import 'swiper/components/navigation/navigation.min.css';
// import SwiperCore, { Navigation } from 'swiper';
import "swiper/css/navigation";
import "swiper/css";
import Attic from "../../../public/assets/attic.jpg";
import Moi from "../../../public/assets/moi.jpg";
import Merv from "../../../public/assets/merv.jpg.jpeg";
import Image from "next/image";

// Activation du module de navigation
// SwiperCore.use([Navigation]);

const categorie = [
  {
    name: "Attic",
    description: "It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    image: Attic,
    btnText: "explore",
  },
  {
    name: "Moi",
    description: "It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    image: Moi,
    btnText: "explore",
  },
  {
    name: "Merv",
    description: "It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    image: Merv,
    btnText: "explore",
  }
];

const CarouselForm = () => {
  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={30}
      navigation={true}
      // modules={[Navigation]}
      breakpoints={{
        700: {
          slidesPerView: 1,
        },
      }}
      className="carouselform-min-h-[600px]"
    >
      {categorie.map((categorie, index) => (
        <SwiperSlide
          className="bg-slade-300 shadow-md min-h-[400px] rounded-md py-16 px-8 mt-10"
          key={index}
        >
          <div className="flex flc gap-5 md:gax16">
            <Image src={categorie.image} height={900} width={1300} alt="image de presentation" />
            <div className="flex flex-col gap-y-5">
              <div className="text-2xl font-medium flex gap-x-2 items-center">
                {categorie.name}
                <div className="h-[3px] w-[40px] bg-green-600 rounded"></div>
                <div className="text-[280px] text-gray-600">{categorie.description}</div>
                <div>
                  {/* <Button link="#" text={categorie.btnText}/> */}
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default CarouselForm;

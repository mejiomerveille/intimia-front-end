import { useState, useEffect } from 'react';
import { BASE_URL_MEDIAS, BASE_URL } from "@/app/services";
import axios from 'axios';
import Image from 'next/image';
import mer from '../public/image 1.jpg'


const Slideshow = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [numSemaine, setNumSemaine] = useState(42);
  const [semaineInfo, setSemaineInfo] = useState({});

  useEffect(() => {
    const fetchSemaineInfo = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/v1/grossesse/semaine/${numSemaine}`);
        setSemaineInfo(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSemaineInfo();
  }, [numSemaine]);

  const images = [
    {
      src: `${BASE_URL_MEDIAS}/${semaineInfo.photoBebe}`,
      alt: 'Slide 1',
    },
    {
      src: `${BASE_URL_MEDIAS}/${semaineInfo.illustrationReelle}`,
      alt: 'Slide 2',
    },
    {
      src: `${BASE_URL_MEDIAS}/${semaineInfo.photoVentreMere}`,
      alt: 'Slide 3',
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide === images.length - 1 ? 0 : prevSlide + 1));
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-auto">
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img height={120}  width={1350} src={image.src} alt={image.alt} layout="fill" objectFit="cover" />
        </div>
      ))}
    </div>
  );
};

export default Slideshow;
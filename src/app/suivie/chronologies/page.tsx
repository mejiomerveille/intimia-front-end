"use client";
import { useState } from "react";
const ImageList = () => {
  const images = [
    { src: 'https://th.bing.com/th/id/OIG4.Ovs6G3kquUNcrzzmohW4?pid=ImgGn', desc: 'Fatigue                    ' },
    { src: 'https://th.bing.com/th/id/OIG4.5L7LEXeN62JviM__dcds?pid=ImgGn', desc: 'Mal de dos                 ' },
    { src: 'https://th.bing.com/th/id/OIG4.J1Nd40Qkj1loJpw53f0c?pid=ImgGn', desc: 'Pas de perte               ' },
    { src: 'https://th.bing.com/th/id/OIG4.Ovs6G3kquUNcrzzmohW4?pid=ImgGn', desc: 'Irritable                  ' },
    { src: 'https://th.bing.com/th/id/OIG4.5L7LEXeN62JviM__dcds?pid=ImgGn', desc: 'Tout va bien               ' },
    { src: 'https://th.bing.com/th/id/OIG4.J1Nd40Qkj1loJpw53f0c?pid=ImgGn', desc: 'Crampes                    ' },
    { src: 'https://th.bing.com/th/id/OIG4.Ovs6G3kquUNcrzzmohW4?pid=ImgGn', desc: 'Seins sensibles            ' },
    { src: 'https://th.bing.com/th/id/OIG4.5L7LEXeN62JviM__dcds?pid=ImgGn', desc: 'Mal de tete                ' }, 
    { src: 'https://th.bing.com/th/id/OIG4.Ovs6G3kquUNcrzzmohW4?pid=ImgGn', desc: 'Acne                       ' },
    { src: 'https://th.bing.com/th/id/OIG4.5L7LEXeN62JviM__dcds?pid=ImgGn', desc: 'Fringales                  ' },
    { src: 'https://th.bing.com/th/id/OIG4.J1Nd40Qkj1loJpw53f0c?pid=ImgGn', desc: 'Insomnie                   ' },
    { src: 'https://th.bing.com/th/id/OIG4.Ovs6G3kquUNcrzzmohW4?pid=ImgGn', desc: 'Somnolence                 ' },
    { src: 'https://th.bing.com/th/id/OIG4.5L7LEXeN62JviM__dcds?pid=ImgGn', desc: 'Ecoulement mamelonnaire    ' },
    { src: 'https://th.bing.com/th/id/OIG4.J1Nd40Qkj1loJpw53f0c?pid=ImgGn', desc: 'Mictions frequentes        ' },
    { src: 'https://th.bing.com/th/id/OIG4.Ovs6G3kquUNcrzzmohW4?pid=ImgGn', desc: 'Crampes dans les jambes    ' },
    { src: 'https://th.bing.com/th/id/OIG4.5L7LEXeN62JviM__dcds?pid=ImgGn', desc: 'Saignement des gencives    ' },
    { src: 'https://th.bing.com/th/id/OIG4.Ovs6G3kquUNcrzzmohW4?pid=ImgGn', desc: 'Aversion alimentaire       ' },
    { src: 'https://th.bing.com/th/id/OIG4.5L7LEXeN62JviM__dcds?pid=ImgGn', desc: 'Appetit accru              ' },
    { src: 'https://th.bing.com/th/id/OIG4.J1Nd40Qkj1loJpw53f0c?pid=ImgGn', desc: 'Perte d"apetit             ' },
    { src: 'https://th.bing.com/th/id/OIG4.Ovs6G3kquUNcrzzmohW4?pid=ImgGn', desc: 'Nausees                    ' },
    { src: 'https://th.bing.com/th/id/OIG4.5L7LEXeN62JviM__dcds?pid=ImgGn', desc: 'Brulures d\'estomac         ' },
    { src: 'https://th.bing.com/th/id/OIG4.J1Nd40Qkj1loJpw53f0c?pid=ImgGn', desc: 'Vomissements' },
    { src: 'https://th.bing.com/th/id/OIG4.Ovs6G3kquUNcrzzmohW4?pid=ImgGn', desc: 'Ballonnements' },
    { src: 'https://th.bing.com/th/id/OIG4.5L7LEXeN62JviM__dcds?pid=ImgGn', desc: 'Constipation' },
    { src: 'https://th.bing.com/th/id/OIG4.J1Nd40Qkj1loJpw53f0c?pid=ImgGn', desc: 'Diarhee' },
    { src: 'https://th.bing.com/th/id/OIG4.Ovs6G3kquUNcrzzmohW4?pid=ImgGn', desc: 'Digestion normale' },
    { src: 'https://th.bing.com/th/id/OIG4.5L7LEXeN62JviM__dcds?pid=ImgGn', desc: 'Selles normales' },
    { src: 'https://th.bing.com/th/id/OIG4.J1Nd40Qkj1loJpw53f0c?pid=ImgGn', desc: 'Gonflement des jambes' },
    { src: 'https://th.bing.com/th/id/OIG4.5L7LEXeN62JviM__dcds?pid=ImgGn', desc: 'Gonflement du visage' },
    { src: 'https://th.bing.com/th/id/OIG4.J1Nd40Qkj1loJpw53f0c?pid=ImgGn', desc: 'Congestion nasale' },
    { src: 'https://th.bing.com/th/id/OIG4.J1Nd40Qkj1loJpw53f0c?pid=ImgGn', desc: 'Calme' },
    { src: 'https://th.bing.com/th/id/OIG4.J1Nd40Qkj1loJpw53f0c?pid=ImgGn', desc: 'Heureuse' },
    { src: 'https://th.bing.com/th/id/OIG4.J1Nd40Qkj1loJpw53f0c?pid=ImgGn', desc: 'Energique' },
    { src: 'https://th.bing.com/th/id/OIG4.J1Nd40Qkj1loJpw53f0c?pid=ImgGn', desc: 'Enjouee' },
    { src: 'https://th.bing.com/th/id/OIG4.J1Nd40Qkj1loJpw53f0c?pid=ImgGn', desc: 'Sautes d\'humeur' },
    { src: 'https://th.bing.com/th/id/OIG4.J1Nd40Qkj1loJpw53f0c?pid=ImgGn', desc: 'Irritable' },
    { src: 'https://th.bing.com/th/id/OIG4.J1Nd40Qkj1loJpw53f0c?pid=ImgGn', desc: 'Triste' },
    { src: 'https://th.bing.com/th/id/OIG4.J1Nd40Qkj1loJpw53f0c?pid=ImgGn', desc: 'Angoissee' },
    { src: 'https://th.bing.com/th/id/OIG4.J1Nd40Qkj1loJpw53f0c?pid=ImgGn', desc: 'Deprimee' },
    { src: 'https://th.bing.com/th/id/OIG4.J1Nd40Qkj1loJpw53f0c?pid=ImgGn', desc: 'Culpabilite' },
    { src: 'https://th.bing.com/th/id/OIG4.J1Nd40Qkj1loJpw53f0c?pid=ImgGn', desc: 'Pensees obsessionnelles' },
    { src: 'https://th.bing.com/th/id/OIG4.J1Nd40Qkj1loJpw53f0c?pid=ImgGn', desc: 'Manque d\'energie' },
    { src: 'https://th.bing.com/th/id/OIG4.J1Nd40Qkj1loJpw53f0c?pid=ImgGn', desc: 'L\'ethargique' },
    { src: 'https://th.bing.com/th/id/OIG4.J1Nd40Qkj1loJpw53f0c?pid=ImgGn', desc: 'Perdue' },
    { src: 'https://th.bing.com/th/id/OIG4.J1Nd40Qkj1loJpw53f0c?pid=ImgGn', desc: 'Tres autocritique' },
  ];
  const [selectedImages, setSelectedImages] = useState([]);

  const handleImageClick = (index) => {
    if (selectedImages.includes(index)) {
      setSelectedImages(selectedImages.filter((imgIndex) => imgIndex !== index));
    } else {
      setSelectedImages([...selectedImages, index]);
    }
  };

  return (
    <div className="mt-24">
      <div className="flex flex-wrap items-center">
        {images.map((image, index) => (
          <div
            key={index}
            className={`flex flex-col items-center mr-4 mb-4 ${selectedImages.includes(index) ? 'border border-green-500' : ''}`}
            onClick={() => handleImageClick(index)}
          >
            <img
              src={image.src}
              alt={image.desc}
              width={70}
              height={70}
              className="rounded-full"
            />
            <p className="text-sm mt-2">{image.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageList;
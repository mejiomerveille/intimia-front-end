"use client";
import Image from "next/image";
import Attic from "../../../../public/images/foetus1.png";
import Moi from "../../../../public/images/fruit1.png";
import Merv from "../../../../public/images/mois1.png";
import { BsFillArrowRightCircleFill, BsFillArrowLeftCircleFill } from "react-icons/bs";

export default function ImagesForm() {
    fetch('http://127.0.0.1:8000/api1/semaine/')
  .then(response => response.json())
  .then(data => {
    const currentWeek = data.week;
    console.log(currentWeek);
  })
  .catch(error => {
    console.error('Une erreur s\'est produite:', error);
  });

  return (
    <section className="text-center mt-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div>
          <h1 className="text-xl">photo de bébé</h1>
          <div className="mx-auto" style={{ width: "220px", height: "420px" }}>
            <Image src={Attic} layout="responsive" alt="photo" />
          </div>
        </div>
        <div>
          <h1 className="text-xl">illustration réelle</h1>
          <div className="mx-auto" style={{ width: "220px", height: "220px" }}>
            <Image src={Moi} layout="responsive" alt="photo" />
          </div>
        </div>
        <div>
          <h1 className="text-xl">photo du ventre de la mère</h1>
          <div className="mx-auto" style={{ width: "220px", height: "220px" }}>
            <Image src={Merv} layout="responsive" alt="photo" />
          </div>
        </div>
      </div>
      <div className="fixed top-0 h-full w-full flex justify-between items-center text-black px-10 text-3xl">
        <button>
          <BsFillArrowLeftCircleFill />
        </button>
        <button>
          <BsFillArrowRightCircleFill />
        </button>
      </div>
    </section>
  );
}
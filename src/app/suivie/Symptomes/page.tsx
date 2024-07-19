"use client";
import axios from 'axios';
import React, { useState, useEffect } from "react";
import Loader from '@/components/register/loader';

const ImageList = () => {
  const[loading,setLoading]=useState(true);
  const images = [
    { src: 'https://media.istockphoto.com/id/1340643448/fr/vectoriel/%C3%A9puisement-professionnel-fille-africaine-%C3%A9puis%C3%A9e-avec-une-batterie-faible-assise-sur-le.jpg?s=612x612&w=0&k=20&c=nOqemHkEXM1f_BgmFPar0XS7nOdbwV1SKgqi4vKUzpw=', desc: 'Fatigue                    ' },
    { src: 'https://media.istockphoto.com/id/1250298159/fr/vectoriel/homme-malade-avec-le-backpain-touchant-le-bas-du-dos.jpg?s=612x612&w=0&k=20&c=BEdKgGhDXVx8Z1-wqlPBBWK1y-oKXN_uffbFMVS-XA4=', desc: 'Mal de dos                 ' },
    { src: 'https://media.istockphoto.com/id/1364656354/fr/vectoriel/dr%C3%B4le-mignon-joyeux-sang-goutte-de-sang-ensemble-de-paquets-illustration-vectorielle-de.jpg?s=612x612&w=0&k=20&c=FXtRtSdGOWLS7JgmLoGB2gzuM9ESgUbX9UW4bfcSgwU=', desc: 'Pas de perte               ' },
    { src: 'https://media.istockphoto.com/id/1301203734/fr/vectoriel/illustration-plate-disolement-de-vecteur-la-femme-afro-am%C3%A9ricaine-triste-sassied-%C3%A0-la.jpg?s=612x612&w=0&k=20&c=0fTqAmLI9OlA3vLBrCvPQQktD8rRn_hQmvPRbpbTfFA=', desc: 'Irritable                  ' },
    { src: 'https://media.istockphoto.com/id/1149310034/fr/vectoriel/ic%C3%B4ne-de-battement-de-coeur-plat-pixel-parfait-pour-mobile-et-web.jpg?s=612x612&w=0&k=20&c=f5EEImALf2AS-4fKgUlueL_lS4GV9mFb4VpYcoa93Kc=', desc: 'Tout va bien               ' },
    { src: 'https://media.istockphoto.com/id/1362167210/fr/vectoriel/douleurs-menstruelles-femme-africaine-triste-avec-des-crampes-abdominales-ou-des.jpg?s=612x612&w=0&k=20&c=mU1myqEtdy74oQUMOyT8rtkIFi_WrDq6Yep0ut_CbOE=', desc: 'Crampes                    ' },
    { src: 'https://media.istockphoto.com/id/1393832334/fr/vectoriel/femme-noire-souffrant-dun-sympt%C3%B4me-du-syndrome-pr%C3%A9menstruel.jpg?s=612x612&w=0&k=20&c=qAURDc5qsqDRHk96SqtrJwlamjbyz5PgUwGPJihgX8g=', desc: 'Seins sensibles            ' },
    { src: 'https://media.istockphoto.com/id/1355654261/fr/vectoriel/femme-avec-migraine-caract%C3%A8re-vectoriel-de-couleur-semi-plate.jpg?s=612x612&w=0&k=20&c=AGN7QqzpVaVgpedaT6siIcdaCtGkRcoBFnc6JMyA9c4=', desc: 'Mal de tete                ' }, 
    { src: 'https://media.istockphoto.com/id/1437972203/fr/vectoriel/une-jeune-femme-afro-am%C3%A9ricaine-avec-une-peau-probl%C3%A9matique-sur-le-visage.jpg?s=612x612&w=0&k=20&c=MZeyiquISYENl-LWqxHOkX4_FU_409JBvRpvzy8JaC0=', desc: 'Acne                       ' },
    { src: 'https://media.istockphoto.com/id/1486670653/fr/vectoriel/trouble-une-femme-arabe-triste-regarde-un-hamburger-et-sinqui%C3%A8te-d%C3%AAtre-en-surpoids-trop.jpg?s=612x612&w=0&k=20&c=NzCL39-mAjrwMx-dPuUpFHhyKJcBStxeojpeuvnrR3k=', desc: 'Fringales                  ' },
    { src: 'https://media.istockphoto.com/id/1362844650/fr/vectoriel/femme-africaine-insomniaque-souffrant-dinsomnie-femme-noire-avec-les-yeux-ouverts.jpg?s=612x612&w=0&k=20&c=6BWUnR8gI_dZsaEQddcuKOqf3eIYUOlzmHIjWnZkKVc=', desc: 'Insomnie                   ' },
    { src: 'https://media.istockphoto.com/id/1159480542/fr/vectoriel/repos-de-femme-enceinte-de-sommeil-sur-la-chaise-jaune.jpg?s=612x612&w=0&k=20&c=Fy7T6Ankazju681fgwgSVzUMlS4nDxPW4R-KrNKc2aY=', desc: 'Somnolence                 ' },
    { src: 'https://assets.survivornet.com/wp-content/uploads/2018/06/18231840/SN_ILLUSTRATIONS_13-1024x576.png', desc: 'Ecoulement mamelonnaire    ' },
    { src: 'https://th.bing.com/th/id/OIG4.J1Nd40Qkj1loJpw53f0c?pid=ImgGn', desc: 'Mictions frequentes        ' },
    { src: 'https://media.istockphoto.com/id/1312761118/fr/vectoriel/concept-de-blessure-band%C3%A9e-ensemble-plat-dillustration-de-caract%C3%A8re-de-patient-de.jpg?s=612x612&w=0&k=20&c=NWyXb8QiHndmPnsQMengl-gExB6Ee6N4gFItWCL456k=', desc: 'Crampes dans les jambes    ' },
    { src: 'https://media.istockphoto.com/id/873788136/fr/vectoriel/caract%C3%A8re-de-dent-de-dessin-anim%C3%A9-mignon-brossage-avec-saignement-sur-les-dents-et.jpg?s=612x612&w=0&k=20&c=R0rmURgTKSXP7KtZCP-RaELNVFnJbQFCXfG1Tz8aMbQ=', desc: 'Saignement des gencives    ' },
    { src: 'https://media.istockphoto.com/id/1332344332/fr/vectoriel/trouble-une-fille-sans-app%C3%A9tit-pour-la-nourriture-une-femme-qui-na-pas-faim-d%C3%A9teste-le.jpg?s=612x612&w=0&k=20&c=5hiQEmP4H9HWUQPDcKiC53Vq0ZvUhKPkgmcdoIZ0mIc=', desc: 'Aversion alimentaire       ' },
    { src: 'https://th.bing.com/th/id/OIG3.CT98KuC8tV142NG0ON3w?pid=ImgGn', desc: 'Appetit accru              ' },
    { src: 'https://th.bing.com/th/id/OIG1.7QqEq5ChOWoQ82Jl7Ari?pid=ImgGn', desc: 'Perte d"apetit             ' },
    { src: 'https://th.bing.com/th/id/OIG4.RotdmN4BIkXau4DHbxLx?pid=ImgGn', desc: 'Nausees                    ' },
    { src: 'https://th.bing.com/th/id/OIG2.VrTYgIEV11Gd.AdnF33E?w=1024&h=1024&rs=1&pid=ImgDetMain', desc: 'Brulures d\'estomac         ' },
    { src: 'https://th.bing.com/th/id/OIG1.uY03KSRk5EPvDm_m7hRH?pid=ImgGn', desc: 'Vomissements' },
    { src: 'https://media.istockphoto.com/id/1710519416/fr/vectoriel/le-personnage-de-la-femme-pr%C3%A9sentant-des-ballonnements-le-sympt%C3%B4me-de-la-gastrite-semble.jpg?s=612x612&w=0&k=20&c=JBp-uU9wk84wvDdNBxtgDq_NPxQQFcBT6e71TZafbyA=', desc: 'Ballonnements' },
    { src: 'https://media.istockphoto.com/id/1415127370/fr/vectoriel/femme-souffrant-de-douleur-dans-labdomen-caract%C3%A8re-vectoriel-de-couleur-semi-plate.jpg?s=612x612&w=0&k=20&c=ZuKGB-CtMhycH82IlckNSKRJA7QJdSzouw1J3UQwAvE=', desc: 'Constipation' },
    { src: 'https://media.istockphoto.com/id/1464217060/fr/vectoriel/jeune-femme-afro-am%C3%A9ricaine-ayant-des-probl%C3%A8mes-de-constipation.jpg?s=612x612&w=0&k=20&c=qVqkO9VzbSIE_Uu-9nrDvvPwFJXk2bGNFU7mNBWXneY=', desc: 'Diarhee' },
    { src: 'https://media.istockphoto.com/id/1408247883/fr/vectoriel/probiotiques-et-avantages-des-pr%C3%A9biotiques-concept-de-vecteur-de-sant%C3%A9-intestinale-de-la.jpg?s=612x612&w=0&k=20&c=AcLaUcSsu0f_quDbowgXBXT_oV-d1AiYOlQLSVrd7eo=', desc: 'Digestion normale' },
    { src: 'https://media.istockphoto.com/id/1322742021/fr/vectoriel/tumeur-de-la-vessie.jpg?s=612x612&w=0&k=20&c=DYltzvVmEIJsNvCXoZOgAuFjBdOpRAWh5l7jegYm2rQ=', desc: 'Selles normales' },
    { src: 'https://th.bing.com/th/id/OIG2.XzX12o7d8KBXr.3Z2ZSw?pid=ImgGn', desc: 'Gonflement des jambes' },
    { src: 'https://th.bing.com/th/id/OIG1.P7ezKS1XBTO_esSPWvcG?pid=ImgGn', desc: 'Gonflement du visage' },
    { src: 'https://th.bing.com/th/id/OIG1..1jnA61ktZzQYBZGok.d?pid=ImgGn', desc: 'Congestion nasale' },
    { src: 'https://th.bing.com/th/id/OIG1.m3._NSGSIsy_EiyrRCkP?pid=ImgGn', desc: 'Calme' },
    { src: 'https://th.bing.com/th/id/OIG3.g7UIBKpVchgDLkZr4vi2?pid=ImgGn', desc: 'Heureuse' },
    { src: 'https://th.bing.com/th/id/OIG3.1p1_VOgSyhFj4AUOY9hn?pid=ImgGn', desc: 'Energique' },
    { src: 'https://th.bing.com/th/id/OIG2.AKvg4_Tl75DrUdbN16Wm?pid=ImgGn', desc: 'Enjouee' },
    { src: 'https://media.istockphoto.com/id/1414207506/fr/vectoriel/deux-mains-dune-personne-tient-deux-masques-souffre-dun-trouble-de-la-double.jpg?s=612x612&w=0&k=20&c=pM6NPEMQheltb_LD9nBEsD5AL1FXtZxINjUqD-iwjHY=', desc: 'Sautes d\'humeur' },
    { src: 'https://media.istockphoto.com/id/1253991133/fr/vectoriel/%C3%A9motic%C3%B4ne-d%C3%A9couper-design-couleurs-plates-expression-faciale-mignonne.jpg?s=612x612&w=0&k=20&c=mVvOUEaKOizlcrfeNAGnW0ojweniGk9wrenaTNcCPr0=', desc: 'Irritable' },
    { src: 'https://th.bing.com/th/id/OIG1.AxaaUcb0b4W8BOpjfyZF?w=1024&h=1024&rs=1&pid=ImgDetMain', desc: 'Triste' },
    { src: 'https://th.bing.com/th/id/OIG2.eokRjhUa891f3x6Aq6bY?pid=ImgGn', desc: 'Angoissee' },
    { src: 'https://media.istockphoto.com/id/1376529400/fr/vectoriel/un-jeune-personnage-masculin-se-couvrant-le-visage-avec-les-mains-une-situation.jpg?s=612x612&w=0&k=20&c=RWQzcF-LIBmnatfR15DDdJDvevTO3E5l5e5rGd5EKVo=', desc: 'Deprimee' },
    { src: 'https://media.istockphoto.com/id/1341072173/fr/vectoriel/femme-triste-ou-d%C3%A9prim%C3%A9e-assise-coinc%C3%A9e-entour%C3%A9e-de-mains-point%C3%A9es.jpg?s=612x612&w=0&k=20&c=enl0I_n1wbPapSjGx7OZJsw8CfXKHLOM19llNNL6lqE=', desc: 'Culpabilite' },
    { src: 'https://media.istockphoto.com/id/1338052926/fr/vectoriel/lesprit-hyperactif.jpg?s=612x612&w=0&k=20&c=klvIFUgSq2Q2bZ5JebL5hWBwpS7rPPUP49VtHc5X6Iw=', desc: 'Pensees obsessionnelles' },
    { src: 'https://th.bing.com/th/id/OIG4.J1Nd40Qkj1loJpw53f0c?pid=ImgGn', desc: 'Manque d\'energie' },
    { src: 'https://th.bing.com/th/id/OIG4.J1Nd40Qkj1loJpw53f0c?pid=ImgGn', desc: 'L\'ethargique' },
    { src: 'https://th.bing.com/th/id/OIG4.J1Nd40Qkj1loJpw53f0c?pid=ImgGn', desc: 'Perdue' },
    { src: 'https://th.bing.com/th/id/OIG4.J1Nd40Qkj1loJpw53f0c?pid=ImgGn', desc: 'Tres autocritique' },
  ];
  const [selectedImages, setSelectedImages] = useState([]);
  const [symptomNames, setSymptomNames] = useState({});

  const handleImageClick = (index) => {
    if (selectedImages.includes(index)) {
      setSelectedImages(selectedImages.filter((imgIndex) => imgIndex !== index));
    } else {
      setSelectedImages([...selectedImages, index]);
    }
  };

  const handleNameChange = (index, value) => {
    setSymptomNames((prevNames) => ({
      ...prevNames,
      [index]: value,
    }));
  };

  const handleSaveSymptoms = () => {
    const selectedSymptoms = selectedImages.map((index) => ({
      name: images[index].desc,
      // name: symptomNames[index] || "", // Récupère le nom du symptôme ou une chaîne vide si le nom n'a pas été saisi
    }));

    const data = {
      symptoms: selectedSymptoms,
    };

    axios.post('http://127.0.0.1:8000/api/v1/symptoms/add_symptomes', data)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };


  useEffect(()=>{
    setTimeout(()=>setLoading(false),1000)
  },[]);

  if(loading){
    return <Loader/>
  }

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
              // width={70}
              // height={70}
              className="rounded-full w-20 h-20"
            />
            <p className="text-sm mt-2">{image.desc}</p>
            <input
            //  hidden
              type='text'
              name="name"
              className="text-sm mt-2"
              value={symptomNames[index] || ""}
              onChange={(e) => handleNameChange(index, e.target.value)}
            />
          </div>
        ))}
      </div>
      <button
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleSaveSymptoms}
      >
        Enregistrer les symptômes
      </button>
    </div>
  );
};

export default ImageList;
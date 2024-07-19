import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
// import styles from './WhatsAppLink.module.css';

const WhatsAppLink = ({ phoneNumber, message }) => {
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="whatsappLink ">
      <FontAwesomeIcon icon={faWhatsapp} /> <span>Démarrer la conversation WhatsApp</span>
    </a>
  );
};

export default WhatsAppLink;
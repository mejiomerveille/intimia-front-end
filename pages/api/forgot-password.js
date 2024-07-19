// pages/api/forgot-password.js
import { sendOtpEmail } from '../../lib/email';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email } = req.body;

    try {
      const otp = generateOtp(); // Générez un code OTP aléatoire
      await sendOtpEmail(email, otp); // Envoyez l'email
      res.status(200).json({ message: 'Code OTP envoyé avec succès' });
    } catch (error) {
      console.error('Erreur lors de l\'envoi du code OTP:', error);
      res.status(500).json({ message: 'Erreur lors de l\'envoi du code OTP.' });
    }
  } else {
    res.status(405).end();
  }
}
// pages/api/verify-otp.js
import { verifyOtp, generateResetToken } from '../../lib/auth';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, otp } = req.body;

    try {
      const isValid = await verifyOtp(email, otp); // Vérifiez le code OTP
      if (isValid) {
        const token = generateResetToken(); // Générez un jeton de réinitialisation
        res.status(200).json({ message: 'Code OTP vérifié avec succès', token });
      } else {
        res.status(400).json({ message: 'Code OTP incorrect.' });
      }
    } catch (error) {
      console.error('Erreur lors de la vérification du code OTP:', error);
      res.status(500).json({ message: 'Erreur lors de la vérification du code OTP.' });
    }
  } else {
    res.status(405).end();
  }
}
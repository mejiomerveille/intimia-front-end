// pages/api/reset-password.js
import { resetPassword } from '../../lib/auth';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, token, password } = req.body;

    try {
      await resetPassword(email, token, password); // Réinitialisez le mot de passe
      res.status(200).json({ message: 'Mot de passe réinitialisé avec succès' });
    } catch (error) {
      console.error('Erreur lors de la réinitialisation du mot de passe:', error);
      res.status(500).json({ message: 'Erreur lors de la réinitialisation du mot de passe.' });
    }
  } else {
    res.status(405).end();
  }
}
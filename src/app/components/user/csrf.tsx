import csrf from 'csrf';

// Create a CSRF instance
const tokens = new csrf();

// Generate a CSRF token
export function getCSRFToken(req, res) {
  const secret = process.env.CSRF_SECRET || 'defaultSecret';
  const token = tokens.create(secret);
  res.setHeader('Set-Cookie', `csrfToken=${token}; Path=/`);
  return token;
}

// Validate a CSRF token
export function validateCSRFToken(req, res) {
  const secret = process.env.CSRF_SECRET || 'defaultSecret';
  const token = req.cookies.csrfToken || '';
  return tokens.verify(secret, token);
}
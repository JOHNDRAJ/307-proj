import jwt from 'jsonwebtoken';

export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Get the token from 'Bearer <token>'
  
    if (!token) {
      return res.status(401).json({ message: 'Access Denied. No token provided.' });
    }
  
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid token.' });
      }
      req.user = user; // Attach the user payload to the request object
      next(); // Move to the next middleware/route handler
    });
  };
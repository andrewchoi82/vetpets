import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken';

const JWT_SECRET: string = (() => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined');
  }
  return process.env.JWT_SECRET;
})();

export function createJWT(payload: object, expiresIn: SignOptions['expiresIn'] = '2h'): string {
   const options: SignOptions = { expiresIn }; 
  return jwt.sign(payload, JWT_SECRET, options); 
}

export function verifyJWT(token: string): JwtPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (typeof decoded === 'string') {
      return null; // Handle unexpected string result
    }
    return decoded;
  } catch {
    return null;
  }
}

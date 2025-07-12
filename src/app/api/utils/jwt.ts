import jwt from 'jsonwebtoken';

export function parseAuthCookie(cookie: string | null): string | null {
  if (!cookie) return null;
  const cookies = cookie.split('; ').reduce((prev, current) => {
    const [name, value] = current.split('=');
    prev[name] = decodeURIComponent(value);
    return prev;
  }, {} as Record<string, string>);
  
  return cookies['authToken'] || null;
}

export function verifyJwt(token: string) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET!) as jwt.JwtPayload;
  } catch (error) {
    return null;
  }
}

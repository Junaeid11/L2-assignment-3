import jwt from 'jsonwebtoken';

export const createToken =(JwtPayload: 
    {email: string;role: string}, secret: string)=>{
    return jwt.sign(JwtPayload, secret)
}

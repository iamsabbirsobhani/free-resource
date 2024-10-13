import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken';

class AuthTokenService {
    private secretKey: string;
    private tokenExpiry: string;

    constructor() {
        this.secretKey = process.env.JWT_SECRET_KEY || 'your-secret-key';
        this.tokenExpiry = '30d';
    }

    generateToken(payload: object): string {
        try {
            const options: SignOptions = { expiresIn: this.tokenExpiry };
            const token = jwt.sign(payload, this.secretKey, options);
            return token;
        } catch (error) {
            throw new Error('Error generating token: ' + error);
        }
    }

    verifyToken(token: string): JwtPayload | null {
        try {
            const decoded = jwt.verify(token, this.secretKey) as JwtPayload;
            return decoded;
        } catch (error) {
            console.error('Error verifying token:', error);
            return null;
        }
    }
}

export default AuthTokenService;

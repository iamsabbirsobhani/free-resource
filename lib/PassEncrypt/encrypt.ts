import bcrypt from 'bcrypt';

class PasswordService {
    private saltRounds: number;

    constructor(saltRounds = 10) {
        this.saltRounds = saltRounds;
    }

    async hashPassword(password: string): Promise<string> {
        try {
            const salt = await bcrypt.genSalt(this.saltRounds);
            const hashedPassword = await bcrypt.hash(password, salt);
            return hashedPassword;
        } catch (error) {
            console.error('Error hashing password:', error);
            throw new Error('Error hashing password');
        }
    }

    async verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
        try {
            const match = await bcrypt.compare(password, hashedPassword);
            return match;
        } catch (error) {
            console.error('Error verifying password:', error);
            throw new Error('Error verifying password');
        }
    }
}

export default PasswordService;

import AuthTokenService from "@/lib/JWT/jwt";
import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";
import PasswordService from "@/lib/PassEncrypt/encrypt";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { username, email, password, code } = body;
        console.log(code)
        if (parseInt(code) === 7539) {
            const userExists = await prisma.user.findFirst({
                where: {
                    email
                }
            });

            if (userExists) {
                return NextResponse.json({ message: "User already exists" });
            }

            const passwordService = new PasswordService();

            const hashedPassword = await passwordService.hashPassword(password);

            const userRes = await prisma.user.create({
                data: {
                    username,
                    email,
                    password: hashedPassword
                }
            });

            const authService = new AuthTokenService();
            const userPayload = { id: userRes.id, email: userRes.email };
            const token = authService.generateToken(userPayload);
            const user = authService.verifyToken(token);
            return NextResponse.json({ message: "Resource added successfully", token, user, error: false });
        } else {
            return NextResponse.json({ message: "Invalid code", error: true });
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json(error, { status: 500 });
    }
}
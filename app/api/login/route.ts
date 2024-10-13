import AuthTokenService from "@/lib/JWT/jwt";
import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";
import PasswordService from "@/lib/PassEncrypt/encrypt";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email, password } = body;

        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user) {
            return NextResponse.json({ message: "User not found", error: true });
        }

        const passwordService = new PasswordService();
        const isPasswordValid = await passwordService.verifyPassword(password, user.password);

        if (!isPasswordValid) {
            return NextResponse.json({ message: "Invalid credentials", error: true });
        }

        const authService = new AuthTokenService();
        const userPayload = { id: user.id, email: user.email };
        const token = authService.generateToken(userPayload);

        return NextResponse.json({
            message: "Login successful",
            token,
            user: { id: user.id, email: user.email },
            error: false
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Server error", error: true }, { status: 500 });
    }
}

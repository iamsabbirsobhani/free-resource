import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

export const revalidate = 10;

export async function GET() {
    try {
        const resources = await prisma.product.findMany();
        if (!resources) {
            throw new Error("Failed to retrieve resources");
        }
        return NextResponse.json({ message: "Resources retrieved successfully", resources });
    } catch (error) {
        console.log("Error retrieving resources:", error);
        return NextResponse.json(error, { status: 500 });
    }
}
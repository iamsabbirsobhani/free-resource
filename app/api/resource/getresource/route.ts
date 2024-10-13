import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

export const revalidate = 10;

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { id } = body;

        const resource = await prisma.product.findUnique({
            where: {
                id: parseInt(id)
            }
        });

        if (!resource) {
            throw new Error("Failed to retrieve resources");
        }
        return NextResponse.json({ message: "Resource retrieved successfully", resource });
    } catch (error) {
        console.log("Error retrieving resource:", error);
        return NextResponse.json(error, { status: 500 });
    }
}
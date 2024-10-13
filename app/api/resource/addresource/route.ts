import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { title, description, imageUrl, fileUrl, id, recommendedUse } = body;
        console.log({
            title,
            description,
            recommendedUse,
            imageUrl,
            fileUrl,
            id
        });

        const resource = await prisma.product.create({
            data: {
                title,
                description,
                recommendedUse,
                imageUrl,
                fileUrl,
                addedById: parseInt(id)
            }
        });

        if (!resource) {
            throw new Error("Failed to add resource");
        }
        return NextResponse.json({ message: "Resource added successfully", resource });
    } catch (error) {
        console.log("Error adding resource:", error);
        return NextResponse.json(error, { status: 500 });
    }
}
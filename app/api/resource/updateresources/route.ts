import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

export const revalidate = 10;

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "0", 10);
    const pageSize = parseInt(searchParams.get("pageSize") || "10", 10);

    try {
        const products = await prisma.product.findMany({
            skip: page * pageSize,
            take: pageSize,
            include: {
                addedBy: true,
            },
        });

        const total = await prisma.product.count();

        const productData = products.map(product => ({
            id: product.id,
            title: product.title,
            imageUrl: product.imageUrl,
            fileUrl: product.fileUrl,
            addedBy: product.addedBy.username,
            createdAt: product.createdAt,
            updatedAt: product.updatedAt,
        }));

        return NextResponse.json({
            message: "Products retrieved successfully",
            products: productData,
            total,
        });
    } catch (error) {
        console.error("Error retrieving products:", error);
        return NextResponse.json({ message: "Failed to retrieve products", error: error }, { status: 500 });
    }
}

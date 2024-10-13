import { NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';

export const revalidate = 10;

export async function PUT(req: Request) {


    try {
        const { id, title, description, recommendedUse, imageUrl, fileUrl } = await req.json();

        const updatedResource = await prisma.product.update({
            where: { id: Number(id) },
            data: {
                title,
                description,
                recommendedUse,
                imageUrl,
                fileUrl,
            },
        });

        return NextResponse.json({ resource: updatedResource }, { status: 200 });
    } catch (error) {
        console.error('Error updating resource:', error);
        return NextResponse.json({ error: 'Failed to update the resource' }, { status: 500 });
    }
}

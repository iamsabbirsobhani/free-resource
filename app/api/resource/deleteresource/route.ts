import { NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';

export const revalidate = 10;

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
        return NextResponse.json({ message: 'Product ID is required' }, { status: 400 });
    }

    try {
        await prisma.product.delete({
            where: { id: Number(id) },
        });
        return NextResponse.json({ message: 'Product deleted successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error deleting product:', error);
        return NextResponse.json({ message: 'Failed to delete product', error: error }, { status: 500 });
    }
}

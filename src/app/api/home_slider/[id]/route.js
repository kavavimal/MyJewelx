import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function DELETE(request, { params }) {
    try {
        const id = Number(params.id);

        const result = await prisma.homeSlider.delete({ where: { id } });

        return NextResponse.json(
            { result, message: 'Home Slide deleted successfully' },
            { status: 200 }
        );
    } catch (error) {
        if (error.name === 'ZodError') {
            return NextResponse.json(
                { error: 'Validation Error', issues: error.errors },
                { status: 400 }
            );
        }
        return NextResponse.json(
            { error: 'Internal Server Error', e: error },
            { status: 500 }
        );
    }
}

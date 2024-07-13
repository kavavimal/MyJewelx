import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const res = await request.formData();
        const title = res.get('title');
        const description = res.get('description');
        const link_url = res.get('link_url');

        const result = await prisma.homeSlider.create({
            data: {
                title: title,
                description: description,
                image_url: '',
                link_url: link_url,
            },
        });

        return NextResponse.json(
            { result },
            { message: 'New Slide created successfully.' },
            { status: 201 }
        );
    } catch (error) {
        console.log(error);
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

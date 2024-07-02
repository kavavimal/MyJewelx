'use server';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export const changeVendorStatus = async (id, status) => {
    try {
        const vendor = await prisma.user.update({
            where: {
                id: id,
            },
            data: {
                status: status,
            },
        });
        revalidatePath('/');
        return vendor;
    } catch (e) {
        console.log(e);
        return e;
    }
};

export const getStoreURLs = () => {
    return prisma.vendor.findMany({
        select: {
            store_url: true,
        },
    });
};

// export const getVendors = async () => {
//     return prisma.user.findMany({
//         where: {
//             role_id: 2,
//         },
//         include: {
//             vendor: true,
//         },
//     });
// };

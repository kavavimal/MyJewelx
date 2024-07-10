import React from 'react';
import StoreList from './component/Storelist';
import prisma from '@/lib/prisma';
import Breadcrumbs from '@/components/Breadcrumbs';
import StorelistSlide from './component/StorelistSlide';
import { VENDOR_ID } from '@/utils/constants';

const getVendors = () =>
    prisma.user.findMany({
        where: {
            role_id: VENDOR_ID,
        },
        include: {
            vendor: true,
        },
    });
const getPromoList = () =>
    prisma.promotional.findMany({
        where: {
            ads_type: 'STORE',
        },
    });

export default async function Storelist() {
    const vendors = await getVendors();
    const promolist = await getPromoList();
    return (
        <>
            <div className="max-w-screen-xl mx-auto">
                <StorelistSlide promolist={promolist} />
                <Breadcrumbs
                    items={[
                        {
                            link: '/store',
                            label: 'Store list',
                            current: true,
                        },
                    ]}
                />
                <StoreList vendors={vendors} />
            </div>
        </>
    );
}

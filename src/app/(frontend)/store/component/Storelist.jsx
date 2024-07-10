'use client';
import React from 'react';
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Avatar,
    Tooltip,
} from '@material-tailwind/react';

export default function StoreVendorPage({ vendors }) {
    console.log(vendors);
    return (
        <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 lg">
            {vendors.length > 0 &&
                vendors.map((list, index) => {
                    return (
                        <>
                            <Card
                                key={index}
                                className="max-w-[24rem] overflow-hidden"
                            >
                                <CardHeader
                                    floated={false}
                                    shadow={false}
                                    color="transparent"
                                    className="m-0 rounded-none"
                                >
                                    <img
                                        src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
                                        alt="ui/ux review check"
                                    />
                                </CardHeader>
                                <CardBody>
                                    <Typography variant="h4" color="blue-gray">
                                        {list.vendor?.store_name
                                            ? list.vendor?.store_name
                                            : list.firstName}
                                    </Typography>
                                    <Typography
                                        variant="lead"
                                        color="gray"
                                        className="mt-3 font-normal text-sm"
                                    >
                                        {list.vendor?.licence_address +
                                            ', ' +
                                            list.vendor?.licence_city +
                                            ', Zip Code - ' +
                                            list.vendor?.licence_zip_code +
                                            ', ' +
                                            list.vendor?.licence_state +
                                            ', ' +
                                            list.vendor?.licence_country +
                                            ', '}
                                    </Typography>
                                    <div className="flex justify-between">
                                        <div>
                                            <p className="text-sm">
                                                {list?.phone_number}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-sm">
                                                {list?.email}
                                            </p>
                                        </div>
                                    </div>
                                </CardBody>
                                <CardFooter className="flex items-center justify-between">
                                    <div className="flex items-center -space-x-3">
                                        <Tooltip content="Natali Craig">
                                            <Avatar
                                                size="sm"
                                                variant="circular"
                                                alt="natali craig"
                                                src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1061&q=80"
                                                className="border-2 border-white hover:z-10"
                                            />
                                        </Tooltip>
                                        <Tooltip content="Tania Andrew">
                                            <Avatar
                                                size="sm"
                                                variant="circular"
                                                alt="tania andrew"
                                                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                                                className="border-2 border-white hover:z-10"
                                            />
                                        </Tooltip>
                                    </div>
                                    <Typography className="font-normal">
                                        January 10
                                    </Typography>
                                </CardFooter>
                            </Card>
                        </>
                    );
                })}
        </div>
    );
}

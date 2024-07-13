'use client';
import { useWishlistStore } from '@/contexts/wishlistStore';
import Link from 'next/link';
import { useEffect } from 'react';

const HeaderWishlistIcon = () => {
    const fetchWishlist = useWishlistStore((state) => state.fetchWishlist);
    const wishlistItems = useWishlistStore((state) => state.wishlistItems);
    useEffect(() => {
        fetchWishlist();
    }, []);
    return (
        <>
            <Link
                href="/profile/wishlist"
                className="p-2 rounded-md flex items-center relative"
            >
                <svg
                    width="26"
                    height="22"
                    viewBox="0 0 26 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M18.4688 0.375C16.2102 0.375 14.2327 1.34625 13 2.98797C11.7673 1.34625 9.78984 0.375 7.53125 0.375C5.73337 0.377026 4.00971 1.09213 2.73842 2.36342C1.46713 3.63471 0.752026 5.35837 0.75 7.15625C0.75 14.8125 12.102 21.0097 12.5855 21.2656C12.7129 21.3342 12.8553 21.37 13 21.37C13.1447 21.37 13.2871 21.3342 13.4145 21.2656C13.898 21.0097 25.25 14.8125 25.25 7.15625C25.248 5.35837 24.5329 3.63471 23.2616 2.36342C21.9903 1.09213 20.2666 0.377026 18.4688 0.375ZM13 19.4937C11.0028 18.33 2.5 13.0286 2.5 7.15625C2.50174 5.82241 3.03237 4.5437 3.97554 3.60054C4.9187 2.65737 6.19741 2.12674 7.53125 2.125C9.65859 2.125 11.4447 3.25813 12.1906 5.07812C12.2565 5.23861 12.3687 5.37587 12.5128 5.47248C12.6569 5.56908 12.8265 5.62065 13 5.62065C13.1735 5.62065 13.3431 5.56908 13.4872 5.47248C13.6313 5.37587 13.7435 5.23861 13.8094 5.07812C14.5553 3.25484 16.3414 2.125 18.4688 2.125C19.8026 2.12674 21.0813 2.65737 22.0245 3.60054C22.9676 4.5437 23.4983 5.82241 23.5 7.15625C23.5 13.0198 14.995 18.3289 13 19.4937Z"
                        fill="#1A1A1A"
                    />
                </svg>
                {wishlistItems && (
                    <span className="absolute top-0 right-0 w-4 h-4 bg-red-400 text-white font-semibold text-xs rounded-full grid place-content-center">
                        {wishlistItems.length}
                    </span>
                )}
            </Link>
        </>
    );
};

export default HeaderWishlistIcon;

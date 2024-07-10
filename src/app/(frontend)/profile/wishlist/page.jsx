import { fetchWishlist } from '@/actions/wishlist';
import Container from '@/components/frontend/Container';
import { redirect } from 'next/navigation';
import { checkUserSession } from '../../layout';
import Paragraph from '@/components/Paragraph';
import Breadcrumbs from '@/components/Breadcrumbs';
import Wishlist from './components/WhishList';

export default async function WishlistPage() {
    const user = await checkUserSession();
    if (!user) {
        redirect('/login');
    }
    const wishlist = await fetchWishlist();
    if (wishlist.status !== 'success') {
        return (
            <Container>
                <Breadcrumbs
                    items={[
                        { link: '/profile', label: 'Profile' },
                        {
                            link: '/profile/wishlist',
                            label: 'Wishlist',
                            current: true,
                        },
                    ]}
                />
                <Paragraph>No Wishlist record found</Paragraph>
            </Container>
        );
    }
    return (
        <Container>
            <Breadcrumbs
                items={[
                    { link: '/profile', label: 'Profile' },
                    {
                        link: '/profile/wishlist',
                        label: 'Wishlist',
                        current: true,
                    },
                ]}
            />
            <h2>Your Wishlist</h2>
            <Wishlist wishlist={wishlist} />
            {/* {wishlist?.wishlistItems &&
                wishlist?.wishlistItems?.map((item) => {
                    {
                        console.log(item);
                    }
                    return (
                        <div
                            key={'wishlistitem' + item.productId}
                            className="border rounded-lg mt-2 mb-3 p-2"
                        >
                            Product Id: #{item.productId}
                            Product Name: #{item.product['product_name']}
                        </div>
                    );
                })} */}
        </Container>
    );
}
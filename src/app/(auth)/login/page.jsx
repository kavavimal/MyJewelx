import Image from 'next/image';
import Form from '@/components/form';
import Link from 'next/link';

export default async function Login() {
    return (
        <div className="flex h-screen items-center justify-center bg-light-burgundy">
            <div className="z-10 w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 shadow-xl">
                <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center sm:px-16">
                    <Link href="/" className="flex items-center gap-x-1.5">
                        <Image
                            src="/assets/logo.png"
                            priority
                            alt="Logo"
                            className="h-10 w-10 rounded-full"
                            width={20}
                            height={20}
                        />
                        <span className="text-2xl font-bold">Jewelex</span>
                    </Link>
                    <h3 className="text-xl font-semibold">Sign In</h3>
                    <p className="text-sm text-gray-500">
                        Use your email and password to sign in
                    </p>
                </div>
                <Form type="login" />
            </div>
        </div>
    );
}

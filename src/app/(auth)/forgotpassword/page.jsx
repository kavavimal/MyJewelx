import ForgotPasswordForm from './ForgotPasswordForm';

export default async function ForgotPassword() {
    return (
        <div className="h-screen bg-[#F9FAFB] w-full overflow-auto">
            <div className="h-full flex items-center justify-center">
                <div className="shadow-3xl p-10 bg-white rounded-2xl max-w-md w-full">
                    <div className="mb-3">
                        <h4 className="text-2xl font-bold trekking-wide">
                            Forgot Password
                        </h4>
                    </div>
                    <ForgotPasswordForm />
                </div>
            </div>
        </div>
    );
}

import { CheckIcon } from '@heroicons/react/20/solid'
import { useBuyPackageMutation } from './store/usersApi';
import "./Pricing.css";



const Pricing = () => {
    const [buyPackage, { data: buyPackageResult, isLoading }] = useBuyPackageMutation();
    const handleBuyButtonClick = (e, credits) => {
        e.preventDefault();
        buyPackage(credits)
    };

    const includedFeatures = [
        'Private one on one sessions',
        'Member resources',
        'Save money while receiving high-quality care',
    ];

    const includedFeatures2 = [
        'Offers sessions outside of typical business hours',
        'Unlimited messaging',
        'Interact with the best therapists',
    ];

    return (
        <div className="pricing-form max-h-screen w-screen bg-white py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl sm:text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Simple one plan</h2>
                    <p className="mt-6 text-lg leading-8 text-gray-600">
                        Come get the help you need at a price you can afford, we are here to help you.
                    </p>
                </div>
                {buyPackageResult ? (<div className="bg-[#FCDFCE] border-t border-b border-[#626670] text-[##BEC6C3] px-4 py-3" role="alert">
                    <p className="font-bold">Your purchase is successful</p>
                    <p className="text-sm">Your new balance is {buyPackageResult.total_credit}</p>
                </div>) : (<div />)}

                <div className="mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-gray-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
                    <div className="p-8 sm:p-10 lg:flex-auto">
                        <h3 className="text-2xl font-bold tracking-tight text-gray-900">Monthly membership</h3>
                        <p className="mt-6 text-base leading-7 text-gray-600">
                            Get access to all of our resources and therapists for one low annually price. Never expires.
                        </p>
                        <div className="mt-10 flex items-center gap-x-4">
                            <h4 className="flex-none text-sm font-semibold leading-6 text-[#626670]">What's included</h4>
                            <div className="h-px flex-auto bg-gray-100" />
                        </div>
                        <ul
                            className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-gray-600 sm:grid-cols-2 sm:gap-6"
                        >
                            {includedFeatures2.map((feature) => (
                                <li key={feature} className="flex gap-x-3">
                                    <CheckIcon className="h-6 w-5 flex-none text-indigo-600" aria-hidden="true" />
                                    {feature}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
                        <div className="rounded-2xl bg-gray-50 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
                            <div className="mx-auto max-w-xs px-8">
                                <p className="text-base font-semibold text-gray-600">Annually membership</p>
                                <p className="mt-6 flex items-baseline justify-center gap-x-2">
                                    <span className="text-5xl font-bold tracking-tight text-gray-900">$150</span>
                                    <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600">USD</span>
                                </p>
                                <button
                                    disabled={isLoading}
                                    onClick={(e) => handleBuyButtonClick(e, 150)}
                                    href="/"
                                    className={`mt-10 block w-full rounded-md bg-[#626670] px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-[#BEC6C3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E0D7D3] ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                                >
                                    Buy
                                </button>
                                <p className="mt-6 text-xs leading-5 text-gray-600">
                                    Invoices and receipts available for easy company reimbursement
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-gray-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
                    <div className="p-8 sm:p-10 lg:flex-auto">
                        <h3 className="text-2xl font-bold tracking-tight text-gray-900">Monthly membership</h3>
                        <p className="mt-6 text-base leading-7 text-gray-600">
                            Get access to all of our resources and therapists for one monthly price. No hidden fees.
                        </p>
                        <div className="mt-10 flex items-center gap-x-4">
                            <h4 className="flex-none text-sm font-semibold leading-6 text-[#626670]">What's included</h4>
                            <div className="h-px flex-auto bg-gray-100" />
                        </div>
                        <ul
                            className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-gray-600 sm:grid-cols-2 sm:gap-6"
                        >
                            {includedFeatures.map((feature) => (
                                <li key={feature} className="flex gap-x-3">
                                    <CheckIcon className="h-6 w-5 flex-none text-indigo-600" aria-hidden="true" />
                                    {feature}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
                        <div className="rounded-2xl bg-gray-50 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
                            <div className="mx-auto max-w-xs px-8">
                                <p className="text-base font-semibold text-gray-600">Monthly Price</p>
                                <p className="mt-6 flex items-baseline justify-center gap-x-2">
                                    <span className="text-5xl font-bold tracking-tight text-gray-900">$100</span>
                                    <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600">USD</span>
                                </p>
                                <button
                                    disabled={isLoading}
                                    onClick={(e) => handleBuyButtonClick(e, 100)}
                                    href="/"
                                    className={`mt-10 block w-full rounded-md bg-[#626670] px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-[#BEC6C3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E0D7D3] ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                                >
                                    Buy
                                </button>
                                <p className="mt-6 text-xs leading-5 text-gray-600">
                                    Invoices and receipts available for easy company reimbursement
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Pricing;

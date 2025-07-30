import React from 'react';
import { Link } from 'react-router-dom';

const PrivacyPolicy: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white shadow-lg rounded-lg p-8">
                    <div className="mb-8">
                        <Link
                            to="/dashboard"
                            className="text-indigo-600 hover:text-indigo-800 transition-colors duration-200"
                        >
                            ← Back to Dashboard
                        </Link>
                    </div>
                    

                    <h1 className="text-3xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
                    <p className="text-gray-600 mb-6">Last updated: {new Date().toLocaleDateString()}</p>

                    <div className="prose prose-lg max-w-none">
                        <div> test</div>
                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Information We Collect</h2>
                            <p className="text-gray-700 mb-4">
                                We collect information you provide directly to us, such as when you create an account,
                                make a booking, or contact us for support. This may include:
                            </p>
                            <ul className="list-disc pl-6 text-gray-700 mb-4">
                                <li>Name and contact information</li>
                                <li>Account credentials</li>
                                <li>Booking preferences and history</li>
                                <li>Payment information</li>
                                <li>Communications with us</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. How We Use Your Information</h2>
                            <p className="text-gray-700 mb-4">
                                We use the information we collect to:
                            </p>
                            <ul className="list-disc pl-6 text-gray-700 mb-4">
                                <li>Provide and maintain our services</li>
                                <li>Process your bookings and payments</li>
                                <li>Send you important updates and notifications</li>
                                <li>Improve our services and user experience</li>
                                <li>Comply with legal obligations</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Information Sharing</h2>
                            <p className="text-gray-700 mb-4">
                                We do not sell, trade, or otherwise transfer your personal information to third parties
                                without your consent, except as described in this policy or as required by law.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Data Security</h2>
                            <p className="text-gray-700 mb-4">
                                We implement appropriate security measures to protect your personal information against
                                unauthorized access, alteration, disclosure, or destruction.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Your Rights</h2>
                            <p className="text-gray-700 mb-4">
                                You have the right to:
                            </p>
                            <ul className="list-disc pl-6 text-gray-700 mb-4">
                                <li>Access your personal information</li>
                                <li>Correct inaccurate information</li>
                                <li>Request deletion of your information</li>
                                <li>Opt-out of marketing communications</li>
                                <li>Lodge a complaint with supervisory authorities</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Contact Us</h2>
                            <p className="text-gray-700 mb-4">
                                If you have any questions about this Privacy Policy, please contact us at:
                            </p>
                            <div className="bg-gray-100 p-4 rounded-lg">
                                <p className="text-gray-700">
                                    Email: privacy@hotelbooking.com<br />
                                    Address: 123 Hotel Street, City, Country<br />
                                    Phone: +1 (555) 123-4567
                                </p>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy; 
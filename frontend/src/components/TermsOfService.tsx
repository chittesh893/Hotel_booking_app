import React from 'react';
import { Link } from 'react-router-dom';

const TermsOfService: React.FC = () => {
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

                    <h1 className="text-3xl font-bold text-gray-900 mb-6">Terms of Service</h1>
                    <p className="text-gray-600 mb-6">Last updated: {new Date().toLocaleDateString()}</p>

                    <div className="prose prose-lg max-w-none">
                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
                            <p className="text-gray-700 mb-4">
                                By accessing and using this Hotel Booking application, you accept and agree to be bound by
                                the terms and provision of this agreement.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Use License</h2>
                            <p className="text-gray-700 mb-4">
                                Permission is granted to temporarily download one copy of the application for personal,
                                non-commercial transitory viewing only. This is the grant of a license, not a transfer
                                of title, and under this license you may not:
                            </p>
                            <ul className="list-disc pl-6 text-gray-700 mb-4">
                                <li>Modify or copy the materials</li>
                                <li>Use the materials for any commercial purpose</li>
                                <li>Attempt to reverse engineer any software contained in the application</li>
                                <li>Remove any copyright or other proprietary notations</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. User Account</h2>
                            <p className="text-gray-700 mb-4">
                                To access certain features of the application, you must create an account. You are
                                responsible for:
                            </p>
                            <ul className="list-disc pl-6 text-gray-700 mb-4">
                                <li>Maintaining the confidentiality of your account information</li>
                                <li>All activities that occur under your account</li>
                                <li>Providing accurate and complete information</li>
                                <li>Notifying us immediately of any unauthorized use</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Booking and Cancellation</h2>
                            <p className="text-gray-700 mb-4">
                                All bookings are subject to availability and confirmation. Cancellation policies vary
                                by hotel and booking type. Please review the specific terms for each booking.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Payment Terms</h2>
                            <p className="text-gray-700 mb-4">
                                Payment is required at the time of booking unless otherwise specified. We accept various
                                payment methods as indicated during the booking process.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Limitation of Liability</h2>
                            <p className="text-gray-700 mb-4">
                                In no event shall Hotel Booking or its suppliers be liable for any damages arising out
                                of the use or inability to use the materials on the application.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Governing Law</h2>
                            <p className="text-gray-700 mb-4">
                                These terms and conditions are governed by and construed in accordance with the laws
                                and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Contact Information</h2>
                            <p className="text-gray-700 mb-4">
                                If you have any questions about these Terms of Service, please contact us at:
                            </p>
                            <div className="bg-gray-100 p-4 rounded-lg">
                                <p className="text-gray-700">
                                    Email: legal@hotelbooking.com<br />
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

export default TermsOfService; 
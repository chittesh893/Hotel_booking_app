import React from 'react';
import { Link } from 'react-router-dom';

const CookiePolicy: React.FC = () => {
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

                    <h1 className="text-3xl font-bold text-gray-900 mb-6">Cookie Policy</h1>
                    <p className="text-gray-600 mb-6">Last updated: {new Date().toLocaleDateString()}</p>

                    <div className="prose prose-lg max-w-none">
                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">What Are Cookies</h2>
                            <p className="text-gray-700 mb-4">
                                Cookies are small text files that are placed on your device when you visit our website.
                                They help us provide you with a better experience by remembering your preferences and
                                analyzing how you use our site.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Types of Cookies We Use</h2>

                            <div className="mb-6">
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">Essential Cookies</h3>
                                <p className="text-gray-700 mb-2">
                                    These cookies are necessary for the website to function properly. They enable basic
                                    functions like page navigation and access to secure areas.
                                </p>
                            </div>

                            <div className="mb-6">
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">Performance Cookies</h3>
                                <p className="text-gray-700 mb-2">
                                    These cookies help us understand how visitors interact with our website by collecting
                                    and reporting information anonymously.
                                </p>
                            </div>

                            <div className="mb-6">
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">Functional Cookies</h3>
                                <p className="text-gray-700 mb-2">
                                    These cookies enable enhanced functionality and personalization, such as remembering
                                    your language preferences.
                                </p>
                            </div>

                            <div className="mb-6">
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">Marketing Cookies</h3>
                                <p className="text-gray-700 mb-2">
                                    These cookies are used to track visitors across websites to display relevant and
                                    engaging advertisements.
                                </p>
                            </div>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">How to Manage Cookies</h2>
                            <p className="text-gray-700 mb-4">
                                You can control and manage cookies in various ways:
                            </p>
                            <ul className="list-disc pl-6 text-gray-700 mb-4">
                                <li>Browser settings: Most browsers allow you to refuse cookies or delete them</li>
                                <li>Cookie consent: You can withdraw consent for non-essential cookies</li>
                                <li>Third-party tools: Use browser extensions to manage cookies</li>
                                <li>Contact us: Reach out if you need help managing your cookie preferences</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Third-Party Cookies</h2>
                            <p className="text-gray-700 mb-4">
                                We may use third-party services that place cookies on your device. These services help
                                us analyze website usage, provide customer support, and improve our services.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Updates to This Policy</h2>
                            <p className="text-gray-700 mb-4">
                                We may update this Cookie Policy from time to time. We will notify you of any changes
                                by posting the new policy on this page and updating the "Last updated" date.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Us</h2>
                            <p className="text-gray-700 mb-4">
                                If you have any questions about our Cookie Policy, please contact us at:
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

export default CookiePolicy; 
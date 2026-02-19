import React from 'react';

export default function PrivacyPolicyPage() {
    return (
        <div className="min-h-screen pt-24 pb-16 bg-white">
            <div className="max-w-4xl mx-auto px-6">
                <h1 className="text-4xl font-bold mb-8 text-emerald-900">Privacy Policy</h1>
                <div className="prose prose-emerald max-w-none text-gray-600">
                    <p className="mb-4">Last updated: {new Date().toLocaleDateString()}</p>
                    <p className="mb-4">
                        Welcome to Go Cycle. We respect your privacy and are committed to protecting your personal data.
                        This privacy policy will inform you as to how we look after your personal data when you visit our website
                        and tell you about your privacy rights and how the law protects you.
                    </p>
                    <h2 className="text-2xl font-bold mt-8 mb-4 text-emerald-800">1. Information We Collect</h2>
                    <p className="mb-4">
                        We may collect, use, store and transfer different kinds of personal data about you which we have grouped together follows:
                        Identity Data, Contact Data, Technical Data, and Usage Data.
                    </p>
                    <h2 className="text-2xl font-bold mt-8 mb-4 text-emerald-800">2. How We Use Your Data</h2>
                    <p className="mb-4">
                        We will only use your personal data when the law allows us to. Most commonly, we will use your personal data
                        in the following circumstances: Where we need to perform the contract we are about to enter into or have entered into with you.
                    </p>
                    <h2 className="text-2xl font-bold mt-8 mb-4 text-emerald-800">3. Data Security</h2>
                    <p className="mb-4">
                        We have put in place appropriate security measures to prevent your personal data from being accidentally lost,
                        used or accessed in an unauthorized way, altered or disclosed.
                    </p>
                </div>
            </div>
        </div>
    );
}

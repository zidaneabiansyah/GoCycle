import React from 'react';

export default function TermsPage() {
    return (
        <div className="min-h-screen pt-24 pb-16 bg-white">
            <div className="max-w-4xl mx-auto px-6">
                <h1 className="text-4xl font-bold mb-8 text-emerald-900">Terms of Service</h1>
                <div className="prose prose-emerald max-w-none text-gray-600">
                    <p className="mb-4">Last updated: {new Date().toLocaleDateString()}</p>
                    <p className="mb-4">
                        These terms and conditions outline the rules and regulations for the use of Go Cycle's Website.
                        By accessing this website we assume you accept these terms and conditions. Do not continue to use Go Cycle
                        if you do not agree to take all of the terms and conditions stated on this page.
                    </p>
                    <h2 className="text-2xl font-bold mt-8 mb-4 text-emerald-800">1. Interpretation and Definitions</h2>
                    <p className="mb-4">
                        The words of which the initial letter is capitalized have meanings defined under the following conditions.
                        The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.
                    </p>
                    <h2 className="text-2xl font-bold mt-8 mb-4 text-emerald-800">2. License</h2>
                    <p className="mb-4">
                        Unless otherwise stated, Go Cycle and/or its licensors own the intellectual property rights for all material on Go Cycle.
                        All intellectual property rights are reserved. You may access this from Go Cycle for your own personal use subjected to restrictions set in these terms and conditions.
                    </p>
                    <h2 className="text-2xl font-bold mt-8 mb-4 text-emerald-800">3. User Comments</h2>
                    <p className="mb-4">
                        This Agreement shall begin on the date hereof. Certain parts of this website offer the opportunity for users to post and exchange opinions and information in certain areas of the website.
                        Go Cycle does not filter, edit, publish or review Comments prior to their presence on the website.
                    </p>
                </div>
            </div>
        </div>
    );
}

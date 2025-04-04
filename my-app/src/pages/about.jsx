import React from "react";

const About = () => {
    return (
        <div className="min-h-screen bg-gray-100">
            {/* Hero Section */}
            <div>
                <h1 className="text-4xl text-white font-bold bg-black bg-opacity-50 p-4 rounded-lg">
                    Welcome to Ram SuperMart
                </h1>
            </div>

            {/* About Content */}
            <div className="container mx-auto p-6">
                {/* Who We Are */}
                <div>
                    <h2 className="text-2xl font-semibold text-blue-600">Who We Are</h2>
                    <p className="text-gray-600 mt-2">
                        SuperMart is your go-to supermarket for fresh produce, groceries, and
                        daily essentials. We have been serving the community for over 10
                        years, providing high-quality products at affordable prices.
                    </p>
                </div>

                {/* Our Mission */}
                <div>
                    <h2 className="text-2xl font-semibold text-green-600">Our Mission</h2>
                    <p className="text-gray-600 mt-2">
                        Our mission is to deliver fresh and affordable groceries to every
                        household. We are committed to sustainability, customer satisfaction,
                        and innovation in the supermarket industry.
                    </p>
                </div>

                {/* Why Choose Us */}
                <div>
                    <h2 className="text-2xl font-semibold text-red-600">Why Choose Us?</h2>
                    <ul className="list-disc ml-5 mt-2 text-gray-600">
                        <li>🛒 High-quality and fresh groceries</li>
                        <li>💰 Affordable prices with great discounts</li>
                        <li>🚀 Fast and reliable home delivery</li>
                        <li>🌱 Eco-friendly and sustainable products</li>
                        <li>👨‍👩‍👧‍👦 Friendly and helpful customer service</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default About;

import type React from 'react';

export const About: React.FC = () => {
  return (
    <div className="container px-4 py-8 mx-auto">
      <h1 className="mb-6 text-4xl font-bold">About Us</h1>
      <div className="prose lg:prose-xl">
        <p className="mb-4">
          Welcome to Rezentry, your trusted partner in real estate solutions. We are committed to revolutionizing
          the way people interact with real estate through innovative technology and exceptional service.
        </p>
        <p className="mb-4">
          Our mission is to make real estate transactions seamless, transparent, and accessible to everyone.
          With our cutting-edge platform, we bring together buyers, sellers, and real estate professionals
          in a dynamic digital marketplace.
        </p>
      </div>
    </div>
  );
};

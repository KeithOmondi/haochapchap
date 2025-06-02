import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import WhatsAppButton from './WhatsAppButton';

const Careers = () => {
  return (
    <>
      <Header />

      <div className="min-h-screen bg-gray-50 py-10 px-5 md:px-10">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Join Our Team</h1>
          <p className="text-gray-600 mb-10">
            We're always looking for passionate and talented people to grow with us.
          </p>

          {/* Current Openings */}
          <div className="space-y-6">
            <CareerCard
              title="Frontend Developer"
              location="Remote"
              type="Full-time"
              description="Build user-friendly web applications with React and Tailwind CSS."
            />
            <CareerCard
              title="Customer Support Associate"
              location="Nairobi, Kenya"
              type="Full-time"
              description="Assist our customers and ensure an excellent user experience."
            />
            <CareerCard
              title="Marketing Intern"
              location="Remote"
              type="Internship"
              description="Support digital marketing campaigns and brand awareness."
            />
          </div>

          {/* Contact CTA */}
          <div className="mt-16">
            <h3 className="text-xl font-semibold mb-2">Don't see a role for you?</h3>
            <p className="text-gray-600 mb-4">
              We're always open to hearing from talented individuals.
            </p>
            <Link
              to="/contact"
              className="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
      <WhatsAppButton />

      <Footer />
    </>
  );
};

const CareerCard = ({ title, location, type, description }) => (
  <div className="bg-white rounded-md shadow-sm p-6 text-left hover:shadow-md transition">
    <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
    <p className="text-gray-500 mb-2">{location} • {type}</p>
    <p className="text-gray-700 mb-4">{description}</p>
    <button className="text-blue-600 hover:underline font-medium">
      Apply Now
    </button>
  </div>
);

export default Careers;

"use client";
import React, { useState, useEffect } from 'react';
import { CertificationData, fetchCertifications } from '@/app/utils/api';

const Certifications: React.FC = () => {
  const [certifications, setCertifications] = useState<CertificationData[]>([]);
  const [filteredCertifications, setFilteredCertifications] = useState<CertificationData[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCertifications = async () => {
      try {
        const data = await fetchCertifications();
        setCertifications(data);
        setFilteredCertifications(data);
      } catch (error) {
        console.error('Failed to fetch certifications:', error);
      } finally {
        setLoading(false);
      }
    };

    getCertifications();
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = certifications.filter(cert =>
      cert.title.toLowerCase().includes(query)
    );
    setFilteredCertifications(filtered);
  };

  if (loading) {
    return <div className="text-center text-gray-400">Loading certifications...</div>;
  }

  if (certifications.length === 0) {
    return (
      <div className="text-center text-gray-400">
        No certifications available at the moment.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search certifications..."
          value={searchQuery}
          onChange={handleSearch}
          className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-gray-200 placeholder-gray-400 focus:border-primary-400 focus:ring-2 focus:ring-primary-400/25 transition-all"
        />
        <svg
          className="absolute left-3 top-3.5 h-5 w-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      {/* Certifications Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCertifications.map((certification) => (
          <div
            key={certification.certificationId}
            className="group relative bg-dark-300/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-primary-400/20 transition-all duration-300 hover:scale-105 hover:-translate-y-1"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary-400/10 via-transparent to-primary-600/5 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-2xl"></div>
            <h3 className="relative z-10 text-lg font-bold text-white group-hover:text-primary-400 transition-colors">
              {certification.title}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Certifications; 
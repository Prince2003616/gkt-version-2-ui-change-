"use client";
import React, { useState, useMemo } from 'react';
import { CourseData } from '@/app/utils/api';
import Button from '../Button';

interface SidebarProps {
  onFilter: (partnerId: number | null, technology: string | null) => void;
  courses: CourseData[];
  onSearch: (query: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onFilter, courses, onSearch }) => {
  const [filters, setFilters] = useState({
    partner: null as number | null,
    technology: null as string | null,
    search: ''
  });

  const { partners, technologies } = useMemo(() => {
    const partnerMap: Record<number, string> = {};
    const techSet = new Set<string>();

    // Get all partners
    courses.forEach((course: CourseData) => {
      if (course.Partner) {
        partnerMap[course.Partner.partnerId] = course.Partner.partnerName;
      }
    });

    // Get technologies based on selected partner
    const relevantCourses = filters.partner 
      ? courses.filter(course => course.Partner?.partnerId === filters.partner)
      : courses;

    relevantCourses.forEach((course: CourseData) => {
      if (course.CourseCategory?.categoryName) {
        techSet.add(course.CourseCategory.categoryName);
      }
    });

    return {
      partners: Object.entries(partnerMap).map(([id, name]) => ({
        id: Number(id),
        name,
      })),
      technologies: Array.from(techSet)
    };
  }, [courses, filters.partner]);

  const handleFilterChange = (
    type: 'partner' | 'technology' | 'search', 
    value: number | string | null
  ) => {
    const newFilters = { ...filters, [type]: value };
    
    if (type === 'partner') {
      newFilters.technology = null; // Reset technology when partner changes
    }
    
    setFilters(newFilters);
    
    if (type === 'search') {
      onSearch(typeof value === 'string' ? value : '');
    } else {
      onFilter(newFilters.partner, newFilters.technology);
    }
  };

  const resetFilters = () => {
    setFilters({ partner: null, technology: null, search: '' });
    onFilter(null, null);
    onSearch('');
  };

  return (
    <div className="w-full" role="search" aria-label="Course filters">
      <div className="bg-dark-300/80 backdrop-blur-sm rounded-2xl transition-all duration-300 p-4">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <label htmlFor="course-search" className="sr-only">Search courses</label>
            <input
              id="course-search"
              type="search"
              placeholder="Search..."
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-dark-400/50 border border-primary-400/10 text-white placeholder-gray-400 focus:border-primary-400 focus:ring-2 focus:ring-primary-400/25 transition-all"
              aria-label="Search courses"
            />
            <svg
              className="absolute left-3 top-3 h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          {/* Dropdown for Partners */}
          <select
            value={filters.partner || ''}
            onChange={(e) => handleFilterChange('partner', e.target.value ? Number(e.target.value) : null)}
            className="rounded-xl bg-dark-400/50 border border-primary-400/10 text-white w-48 py-3 focus:outline-none focus:ring-2 focus:ring-primary-400"
          >
            <option value="" className="bg-dark-400 text-gray-300">Select Partner</option>
            {partners.map((partner) => (
              <option key={partner.id} value={partner.id} className="bg-dark-400 text-white hover:bg-primary-400/10">
                {partner.name}
              </option>
            ))}
          </select>

          {/* Dropdown for Technologies */}
          <select
            value={filters.technology || ''}
            onChange={(e) => handleFilterChange('technology', e.target.value || null)}
            className="rounded-xl bg-dark-400/50 border border-primary-400/10 text-white w-48 py-3 focus:outline-none focus:ring-2 focus:ring-primary-400"
          >
            <option value="" className="bg-dark-400 text-gray-300">Select Technology</option>
            {technologies.map((technology) => (
              <option key={technology} value={technology} className="bg-dark-400 text-white hover:bg-primary-400/10">
                {technology}
              </option>
            ))}
          </select>

          {/* Reset Button */}
          <Button onClick={resetFilters} aria-label="Reset all filters">
            Reset All
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
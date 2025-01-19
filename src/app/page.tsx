"use client";
import { useState } from "react";
import Header from "./components/Header/Header";
import Breadcrumb from "./components/BreadCrumb/breadcrumb";
import Sidebar from "./components/Sidebar/Sidebar";
import CourseCard from "./components/CourseCard/CourseCard";
import AIWheel from './components/AIWheel/AIWheel';
import CourseNav from "./components/CourseNav/CourseNav";
import Certifications from './components/Certifications/Certifications';
import Footer from './components/Footer/Footer';
import { useCourseManagement } from "@/app/hooks/useCourseManagement";

export default function Home() {
  const {
    courses,
    displayedCourses,
    handleLoadMore,
    handleFilter,
    handleSearch,
    hasMore
  } = useCourseManagement(10);
  
  const [activeTab, setActiveTab] = useState<'courses' | 'certifications'>('courses');

  return (
    <div className="min-h-screen bg-dark-500 bg-mesh-pattern bg-fixed bg-cover bg-center bg-no-repeat">
      <div className="bg-noise-pattern bg-repeat opacity-[0.03] absolute inset-0 z-0"></div>
      <div className="relative z-10">
        <Header />
        <main className="pt-[100px]">
          <Breadcrumb />
          
          <section className="py-16 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-highlight-500/5 to-transparent"></div>
            <AIWheel />
          </section>

          <div className="container mx-auto px-4 py-8">
            <CourseNav 
              activeTab={activeTab} 
              onTabChange={setActiveTab}
            />
            
            {activeTab === 'courses' ? (
              <div className="mt-8">
                <div className="container mx-auto px-4">
                  <div className="bg-dark-300/80 backdrop-blur-sm rounded-2xl p-4 mb-8">
                    <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
                      <div className="w-full">
                        <Sidebar 
                          onFilter={handleFilter} 
                          courses={courses} 
                          onSearch={handleSearch}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="bg-dark-300/30 backdrop-blur-sm rounded-2xl p-6">
                    <CourseCard 
                      courses={displayedCourses} 
                      onLoadMore={handleLoadMore}
                      hasMore={hasMore}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <Certifications />
            )}
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}

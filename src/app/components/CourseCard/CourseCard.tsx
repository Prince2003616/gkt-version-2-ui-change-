import React, { memo } from 'react';
import { CourseData } from '@/app/utils/api';
import Button from '../Button';

interface CourseCardProps {
  courses: CourseData[];
  onLoadMore: () => void;
  hasMore: boolean;
}

const CourseCard: React.FC<CourseCardProps> = memo(({ courses, onLoadMore, hasMore }) => {
  // State to keep track of how many courses to display
  const [displayCount, setDisplayCount] = React.useState(9); // Start with 9 cards

  // Function to load more courses
  const loadMoreCourses = () => {
    setDisplayCount((prevCount) => prevCount + 9); // Increase by 9 each time
    onLoadMore(); // Call the parent function to load more data if needed
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.slice(0, displayCount).map((course) => ( // Display only the number of courses specified by displayCount
          <div 
            key={course.courseId} 
            className="group relative bg-dark-300/80 backdrop-blur-sm rounded-2xl overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1 hover:shadow-lg hover:shadow-primary-400/30"
          >
            <div className="relative p-6">
              <div className="flex flex-wrap gap-2 mb-4">
                {course.Partner && (
                  <span className="bg-dark-300/50 text-primary-400 text-sm px-3 py-1 rounded-full border border-primary-400/20 hover:border-primary-400/50 hover:bg-primary-400/10 transition-all cursor-pointer">
                    {course.Partner.partnerName}
                  </span>
                )}
                
                {course.CourseCategory && (
                  <span className="bg-dark-300/50 text-accent-400 text-xs px-2 py-1 rounded-full border border-accent-400/20 hover:border-accent-400/50 hover:bg-accent-400/10 transition-all cursor-pointer">
                    {course.CourseCategory.categoryName}
                  </span>
                )}
              </div>
              
              <h3 className="text-lg font-bold text-white group-hover:text-primary-400 transition-colors line-clamp-2 mb-3">
                {course.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
      
      {hasMore && (
        <div className="flex justify-center mt-10">
          <Button onClick={loadMoreCourses}>
            Load More Courses
          </Button>
        </div>
      )}
    </div>
  );
});

CourseCard.displayName = 'CourseCard';
export default CourseCard; 
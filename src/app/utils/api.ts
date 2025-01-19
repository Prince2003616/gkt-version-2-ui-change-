interface Partner {
  partnerId: number;
  partnerName: string;
}

interface CourseCategory {
  categoryName: string;
}

export interface CourseData {
  Partner?: Partner;
  CourseCategory?: CourseCategory;
  courseId: number;
  title: string;
  originalPrice: string;
  discountedPrice: string;
}

export const fetchCourses = async (): Promise<CourseData[]> => {
  const response = await fetch('http://stu.globalknowledgetech.com:5001/lms/course');
  const data = await response.json();
  return data.courses;
};

interface CertificationPartner {
  partnerId: number;
  partnerName: string;
}

interface CertificationCategory {
  categoryName: string;
}

export interface CertificationData {
  certificationId: number;
  title: string;
  Partner?: CertificationPartner;
  CertificationCategory?: CertificationCategory;
  description?: string;
  duration?: string;
  level?: string;
}

export const fetchCertifications = async (): Promise<CertificationData[]> => {
  try {
    const response = await fetch('http://stu.globalknowledgetech.com:5001/lms/certifications');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    
    // Check if data has the expected structure
    if (!data || !Array.isArray(data.certifications)) {
      console.error('Invalid API response structure:', data);
      return [];
    }
    
    return data.certifications;
  } catch (error) {
    console.error('Error fetching certifications:', error);
    return [];
  }
};

export const fetchCoursesByPartner = async () => {
  try {
    const response = await fetch('http://stu.globalknowledgetech.com:5001/lms/course');
    const data = await response.json();
    
    // Group courses by partner
    const groupedCourses = data.courses.reduce((acc: Record<string, CourseData[]>, course: CourseData) => {
      const partnerName = course.Partner?.partnerName || 'Other';
      if (!acc[partnerName]) {
        acc[partnerName] = [];
      }
      acc[partnerName].push(course);
      return acc;
    }, {});

    return groupedCourses;
  } catch (error) {
    console.error('Error fetching courses by partner:', error);
    return {};
  }
};

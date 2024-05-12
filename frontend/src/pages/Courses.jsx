import React, { useEffect } from 'react';
import CourseCard from '../components/CourseCard';

export const Courses = () => {
  // const [courses, setCourses] = useState([]);

  // useEffect(() => {
  //     const fetchCourses = async () => {
  //         try {
  //             const response = await axios("url");
  //             setCourses(response);

  //         } catch (error) {
  //             console.error("Error fetching courses: " , error)
  //         }
  //     }
  //     fetchCourses();
  // }, [])

  const courses = [
    {
      id: 1,
      title: 'Introduction to JavaScript',
      description: 'Learn the basics of JavaScript programming.',
    },
    {
      id: 2,
      title: 'React for Beginners',
      description: 'Get started with React and build your first app.',
    },
    {
      id: 3,
      title: 'Node.js Fundamentals',
      description: 'Learn the fundamentals of Node.js for backend development.',
    },
    {
      id: 4,
      title: 'Node.js Fundamentals',
      description: 'Learn the fundamentals of Node.js for backend development.',
    },
  ];
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-4">Courses</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 m-10">
        {courses.map((course) => (
          <CourseCard key={course.id} title={course.title} description={course.description} />
        ))}
      </div>
    </div>
  );
};

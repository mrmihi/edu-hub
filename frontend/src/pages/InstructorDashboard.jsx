import React, { useState, useEffect } from 'react';
import axios from 'axios';

const InstructorDashboard = () => {
  const [learners, setLearners] = useState([]);
  const [courses, setCourses] = useState([]);
  const [courseTitle, setCourseTitle] = useState('');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [report, setReport] = useState(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get('/api/courses');
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const fetchLearners = async (courseId) => {
    try {
      const response = await axios.get(`/api/courses/${courseId}/learners`);
      setLearners(response.data);
      setSelectedCourse(courseId);
    } catch (error) {
      console.error('Error fetching learners:', error);
    }
  };

  const handleAddCourse = async () => {
    try {
      const response = await axios.post('/api/courses', { title: courseTitle });
      setCourses([...courses, response.data]);
      setCourseTitle('');
    } catch (error) {
      console.error('Error adding course:', error);
    }
  };

  const handleDeleteCourse = async (courseId) => {
    try {
      await axios.delete(`/api/courses/${courseId}`);
      setCourses(courses.filter((course) => course.id !== courseId));
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  const fetchReport = async () => {
    try {
      const response = await axios.get('/api/report');
      setReport(response.data);
    } catch (error) {
      console.error('Error fetching report:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-4">Instructor Dashboard</h1>
      <div className="flex space-x-4">
        <div className="w-1/2">
          <h2 className="text-2xl font-semibold mb-2">Courses</h2>
          <div className="mb-4">
            <input type="text" value={courseTitle} onChange={(e) => setCourseTitle(e.target.value)} className="border rounded px-2 py-1 mr-2" placeholder="Course Title" />
            <button onClick={handleAddCourse} className="bg-indigo-500 text-white px-4 py-1 rounded">
              Add Course
            </button>
          </div>
          <ul className="list-disc pl-4">
            {courses.map((course) => (
              <li key={course.id} className="mb-2">
                <span>{course.title}</span>
                <button onClick={() => fetchLearners(course.id)} className="ml-4 text-indigo-500">
                  View Learners
                </button>
                <button onClick={() => handleDeleteCourse(course.id)} className="ml-2 text-red-500">
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-1/2">
          <h2 className="text-2xl font-semibold mb-2">Learners</h2>
          {selectedCourse ? (
            <ul className="list-disc pl-4">
              {learners.map((learner) => (
                <li key={learner.id} className="mb-2">
                  {learner.name} - Progress: {learner.progress}%
                </li>
              ))}
            </ul>
          ) : (
            <p>Select a course to view learners</p>
          )}
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-2">Reports</h2>
        <button onClick={fetchReport} className="bg-indigo-500 text-white px-4 py-2 rounded">
          Generate Report
        </button>
        {report && (
          <div className="mt-4">
            <h3 className="text-xl font-semibold">Report</h3>
            <pre>{JSON.stringify(report, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default InstructorDashboard;

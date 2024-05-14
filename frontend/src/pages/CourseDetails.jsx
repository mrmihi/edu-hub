import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const CourseDetails = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  //const navigate = Navigate();

  useEffect(() => {
    const getCourse = async () => {
      try {
        const resposne = await axios.get("url");
        setCourse(resposne.data);
      } catch (error) {
        console.error("Failed to get course details: ".error);
      }
    };
    getCourse();
  }, [courseId]);

  if (!course) {
    return <div>Loading...</div>;
  }

  const handleEnrollment = () => {
    //navigate("/payments");
  };

  return (
    <div className="relative">
      <div className="flex flex-col">
        <div className=" bg-indigo-50 p-8">
          <h1 className="text-4xl font-bold">{course.title}</h1>
          <button
            className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded mt-4"
            onClick={handleEnrollment}
          >
            Enroll
          </button>
        </div>
        <div className="p-8">
          <p className="text-xl font-medium">{course.description}</p>
          <p className="text-xl font-medium">{course.duration}</p>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;

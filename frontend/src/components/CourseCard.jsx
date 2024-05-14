import React from "react";
import { Link } from "react-router-dom";

const CourseCard = ({ title, description }) => {
  return (
    <div className="max-w-md mx-auto bg-indigo-50 shadow-lg rounded-lg overflow-hidden">
      <div className="md:flex">
        <div className="md:flex-shrink-0">
          {/* <img
            className="h-48 w-full object-cover md:w-48"
            src="https://via.placeholder.com/150"
            alt="Course"
          /> */}
        </div>
        <div className="p-8">
          <p className="mt-2 font-semibold text-2xl text-indigo-800">{title}</p>
          <p className="mt-2 text-gray-500">{description}</p>
          <Link to={"/course-details"} className="mt-4 block w-full">
            <button className="bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 px-4 rounded">
              View Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;

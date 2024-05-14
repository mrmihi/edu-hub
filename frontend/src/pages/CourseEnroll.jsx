import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProgressBar from '../components/ProgressBar';

export const CourseEnroll = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  //   const [courses, setCourses] = useState([]);

  //   useEffect(() => {
  //     const fetchCourses = async () => {
  //       try {
  //         const response = await axios.get("url");
  //         setCourses(response.data);
  //       } catch (error) {
  //         console.error("Error fetching courses: ", error);
  //       }
  //     };
  //     fetchCourses();
  //   }, []);

  const handleSelectedItem = (item) => {
    setSelectedItem(item);
  };

  const [progressValues, setProgressValues] = useState({
    item1: 60,
  });

  const handleCheckboxChange = (itemName) => {
    setProgressValues({
      ...progressValues,
      [itemName]: progressValues[itemName] === 100 ? 0 : 100,
    });
  };

  return (
    <div className="mx-auto h-full">
      <div className="max-w mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-4 bg-indigo-50">
          <div className="mt-40">
            <h1 className="text-5xl font-semibold mb-2">Course Title</h1>
            <p className="text-xl">Instructor: Instructor Name</p>
          </div>
        </div>

        <div className="p-4">
          <div className="flex justify-between">
            <div>
              <h2 className="text-lg font-semibold mb-2">Description</h2>
              <p className="text-sm">Course Description</p>
            </div>

            <div className="mt-4">
              {/* Progress bars */}
              <h2 className="text-lg font-semibold mb-2">Progress</h2>
              {Object.keys(progressValues).map((key) => (
                <ProgressBar key={key} itemName={`Item ${key}`} progressValue={progressValues[key]} />
              ))}
            </div>
          </div>

          <div className="mt-6 py-6 px-28">
            <div className="flex flex-col justify-between">
              <div className="flex bg-indigo-50 px-6 py-6 flex-row">
                <button className="mr-6 hover:bg-indigo-500">Notes</button>
                <button className="mr-6 hover:bg-indigo-500">Videos</button>
                <button className="hover:bg-indigo-500">Quizzes</button>
              </div>
            </div>
            <div className="mt-10">
              <div className="flex bg-gray-100 hover:bg-indigo-500 px-6 py-6 flex-row">
                <span>Course Title</span>
              </div>
              <div className="absolute z-10 mt-1 w-full rounded-md bg-white shadow-lg">
                <ul>
                  <li className="py-2 px-4 flex items-center">
                    <span>Item 1</span>
                    <input type="checkbox" className="mr-2" />
                  </li>
                  <li className="py-2 px-4 flex items-center">
                    <span>Item 2</span>
                    <input type="checkbox" className="mr-2" />
                  </li>
                  <li className="py-2 px-4 flex items-center">
                    <span>Item 3</span>
                    <input type="checkbox" className="mr-2" />
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-4">
              {/* Content of selected item */}
              {selectedItem && (
                <div>
                  <h3 className="text-lg font-semibold">{selectedItem}</h3>
                  <p>Content of {selectedItem}</p>
                </div>
              )}
              {/* Use state to manage which item is selected and display the content accordingly */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

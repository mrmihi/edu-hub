import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProgressBar from '../components/ProgressBar';

export const CourseEnroll = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [progressValues, setProgressValues] = useState(0);
  const [courses, setCourses] = useState({
    title: 'Introduction to JavaScript',
    description:
      'JavaScript, often abbreviated as JS, is a programming language and core technology of the Web, alongside HTML and CSS. 99% of websites use JavaScript on the client side for webpage behavior. Web browsers have a dedicated JavaScript engine that executes the client code.',
    instructor: 'John Doe',
    content: {
      lectureNotes: [
        {
          title: 'Introduction to Variables',
          content: 'Variables are used to store data values.',
          progress: 3,
        },
        {
          title: 'Data Types',
          content: 'JavaScript supports several data types including string, number, boole…',
          progress: 10,
        },
        {
          title: 'JavaScript Syntax',
          content: 'Variables are used to store data values.',
          progress: 8,
        },
        {
          title: 'Object, Properties and Methods',
          content: 'Variables are used to store data values.',
          progress: 7,
        },
        {
          title: 'Way to convert an Array to a String',
          content: 'Variables are used to store data values.',
          progress: 5,
        },
        {
          title: 'Boolean Values',
          content: 'Variables are used to store data values.',
          progress: 8,
        },
        {
          title: 'JavaScript this Keyword',
          content: 'Variables are used to store data values.',
          progress: 2,
        },
        {
          title: 'Classes and Modules',
          content: 'Variables are used to store data values.',
          progress: 7,
        },
      ],
    },
  });

  // useEffect(() => {
  //   const fetchCourses = async () => {
  //     try {
  //       const response = getAllCourses();
  //       setCourses(response.data);
  //     } catch (error) {
  //       console.error('Error fetching courses: ', error);
  //     }
  //   };
  //   fetchCourses();
  // }, []);

  // console.log(courses);

  const handleSelectedItem = (item) => {
    setSelectedItem(item);
  };

  const handleCheckboxChange = (event, note) => {
    const isChecked = event.target.checked;
    const value = note.progress;
    setProgressValues((prevValue) => (isChecked ? prevValue + value : prevValue - value));
  };

  return (
    <div className="mx-auto h-full">
      <div className="max-w mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-4 bg-indigo-50">
          <div className="mt-40">
            <h1 className="text-5xl font-semibold mb-2">{courses.title}</h1>
            <p className="text-3xl">{courses.instructor}</p>
          </div>
        </div>

        <div className="p-4">
          <div className="flex justify-between mt-10">
            <div className="ml-28 max-w-xl">
              <p className="text-m font-semibold">{courses.description}</p>
            </div>

            <div className="mr-28  border-4 border-indigo-500">
              {/* Progress bars */}
              <div className="bg-white shadow rounded p-4 w-80">
                <ProgressBar progressValue={progressValues} />
              </div>
            </div>
          </div>

          <div className="mt-6 py-6 px-28">
            <div className="flex flex-col justify-between">
              <div className="flex bg-indigo-500 px-6 py-6 flex-row">
                <button className="mr-6 hover:bg-indigo-500 text-slate-100 font-semibold text-m">Notes</button>
                <button className="mr-6 hover:bg-indigo-500 text-slate-100 font-semibold text-m">Videos</button>
                <button className="hover:bg-indigo-500 text-slate-100 font-semibold text-m">Quizzes</button>
              </div>
            </div>
            <div className="mt-10">
              {/* <div className="flex bg-gray-100 hover:bg-indigo-500 px-6 py-6 flex-row">
                <span>Course Title</span>
              </div> */}
              <div className="relative z-10 mt-1 w-full rounded-md bg-white shadow-lg">
                <ul>
                  {courses.content.lectureNotes.map((note, index) => (
                    <li key={index} className="py-2 px-4 flex justify-center items-center w-full">
                      <span className="flex-1">{note.title}</span>
                      <input type="checkbox" className="ml-2" onChange={(e) => handleCheckboxChange(e, note)} />
                    </li>
                  ))}
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

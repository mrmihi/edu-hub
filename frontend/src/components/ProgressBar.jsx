import React from 'react';

const ProgressBar = ({ courseName, progressValue }) => {
  return (
    <div className="flex items-center mt-2">
      <span className="mr-4">{courseName}</span>
      <div className="bg-gray-200 w-full h-2 rounded-full">
        <div className="bg-indigo-500 h-full rounded-full" style={{ width: `${progressValue}%` }}></div>
      </div>
      <span className="ml-4">{progressValue}%</span>
    </div>
  );
};

export default ProgressBar;

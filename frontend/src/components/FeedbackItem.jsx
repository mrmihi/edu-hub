import React from "react";

export const FeedbackItem = ({ feedback }) => {
  const { id, type, remarks, status, dateTime } = feedback;

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Feedback ID
        </label>
        <p className="text-gray-700 text-lg">{id}</p>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Type
        </label>
        <p className="text-gray-700 text-lg">{type}</p>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Remarks
        </label>
        <p className="text-gray-700 text-lg">{remarks}</p>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Status
        </label>
        <p className="text-gray-700 text-lg">{status}</p>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Date and Time
        </label>
        <p className="text-gray-700 text-lg">{dateTime}</p>
      </div>
    </div>
  );
};

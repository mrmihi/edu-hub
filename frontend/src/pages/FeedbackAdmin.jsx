import React, { useState } from 'react';

const FeedbackAdmin = () => {
  // Sample feedback data
  const feedbackData = [
    {
      feedbackId: 1,
      learnerName: 'John Doe',
      type: 'General',
      remarks: 'Great course!',
      dateTime: '2024-05-15T08:00:00Z',
      status: 'Pending',
    },
    {
      feedbackId: 2,
      learnerName: 'Jane Smith',
      type: 'Technical',
      remarks: 'Could be improved.',
      dateTime: '2024-05-16T10:00:00Z',
      status: 'Approved',
    },
  ];

  const statusOptions = ['Pending', 'Approved', 'In Progress'];

  // State to track the selected status
  const [selectStatus, setSelectStatus] = useState('');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-4">Feedback List</h1>
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">Feedback ID</th>
            <th className="border border-gray-300 px-4 py-2">Learner Name</th>
            <th className="border border-gray-300 px-4 py-2">Type</th>
            <th className="border border-gray-300 px-4 py-2">Remarks</th>
            <th className="border border-gray-300 px-4 py-2">Date and Time</th>
            <th className="border border-gray-300 px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {feedbackData.map((feedback) => (
            <tr key={feedback.feedbackId}>
              <td className="border border-gray-300 px-4 py-2">{feedback.feedbackId}</td>
              <td className="border border-gray-300 px-4 py-2">{feedback.learnerName}</td>
              <td className="border border-gray-300 px-4 py-2">{feedback.type}</td>
              <td className="border border-gray-300 px-4 py-2">{feedback.remarks}</td>
              <td className="border border-gray-300 px-4 py-2">{new Date(feedback.dateTime).toLocaleString()}</td>
              <td className="border border-gray-300 px-4 py-2">
                <select className="px-2 py-1 border border-gray-300 rounded" value={selectStatus} onChange={(e) => setSelectStatus(e.target.value)}>
                  {statusOptions.map((option) => (
                    <option key={option} value={option} className="p-5">
                      {option}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FeedbackAdmin;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FeedbackApi } from '../services/feedback';
import { enqueueSnackbar } from 'notistack';

export const FeedbackForm = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const type = e.target.type.value;
    const remarks = e.target.remarks.value;

    if (!type || !remarks) {
      setError('Type and Remarks are required');
      return;
    }

    const request = {
      type: type,
      remarks: remarks,
    };
    setError('');

    try {
      const response = await FeedbackApi(request);
      if (response.success) {
        enqueueSnackbar('Feedback Sent', { variant: 'success' });
        navigate('/dashboard');
      } else {
        enqueueSnackbar('Feedback Failed', { variant: 'error' });
      }
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };
  return (
    <div className="flex justify-center mt-10">
      <div className="w-1/2 mr-4 ml-20">
        <h2 className="text-5xl font-bold mb-4">Earn your course from Eduhub</h2>
        <h3 className="text-xl font-semibold mb-1">Welcome to Feedback of Eduhub! Your opinion matters!</h3>
        <p className="text-lg mr-10 mt-10">
            At Eduhub, we are committed to providing an exceptional learning experience tailored to your needs. Your feedback is invaluable in helping us achieve this goal. Whether you've encountered
            a glitch, have a suggestion for improvement, or simply want to share your thoughts, we're here to listen. This is your platform to voice your opinions, share your experiences, and
            contribute to the continual enhancement of Eduhub. Your feedback fuels our innovation and drives our dedication to excellence. Let your voice be heard! Take a moment to share your
            insights, ideas, and suggestions below. Together, we'll shape the future of education on Eduhub. Thank you for being a part of our journey towards a brighter, more enriching learning
            environment.
          Happy learning, The Eduhub Team !!!
        </p>
      </div>
      <div className="w-1/2 ml-4 mr-20">
        <div>
          <h1 className="text-2xl font-semibold mt-4 mb-4 ml-10">Send Feedback</h1>
          <form className="bg-indigo-50 shadow-md rounded-lg overflow-hidden mt-6 px-8 pt-6 pb-8 ml-8" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="type">
                Type
              </label>
              <select id="type" name="type" className="sm:text-sm shadow border rounded w-full py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline">
                <option value="technical">Technical</option>
                <option value="review">Review</option>
              </select>
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="remarks">
                Remarks
              </label>
              <textarea
                id="remarks"
                name="remarks"
                className="border w-full py-2 px-3 border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                rows="4"
                placeholder="Enter your remarks here..."
              ></textarea>
            </div>
            <div className="flex items-center justify-between">
              <button className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded mt-4" type="submit">
                Send Feedback
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { FeedbackItem } from '../components/FeedbackItem';

export const Feedbacks = ({ feedbacks }) => {
  return (
    <div className="flex flex-col items-center mt-10">
      <h1 className="text-3xl font-semibold mb-6">Feedbacks</h1>
      <div className="w-1/2">
        {/* {feedbacks.map((feedback) => (
          <FeedbackItem key={feedback.id} feedback={feedback} />
        ))} */}
      </div>
    </div>
  );
};

import React from "react";

export const FeedbackForm = () => {
  return (
    <div className="flex justify-center mt-10">
      <div className="w-1/2 mr-4 ml-20">
        <h2 className="text-5xl font-bold mb-2">
          Earn your course from Eduhub
        </h2>
        <p className="text-lg mr-10 mt-10">
          This is the description of the feedback page. Lorem ipsum dolor sit
          amet, consectetur adipiscing elit. Nulla nec libero vel libero pretium
          mattis nec id odio. This is the description of the feedback page.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec
          libero vel libero pretium mattis nec id odio. This is the description
          of the feedback page. Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Nulla nec libero vel libero pretium mattis nec id
          odio.
        </p>
      </div>
      <div className="w-1/2 ml-4 mr-20">
        <div>
          <h1 className="text-2xl font-semibold mt-4 mb-4 ml-10">
            Send Feedback
          </h1>
          <form className="bg-indigo-50 shadow-md rounded-lg overflow-hidden mt-6 px-8 pt-6 pb-8 ml-8">
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="type"
              >
                Type
              </label>
              <select
                id="type"
                name="type"
                className="sm:text-sm shadow border rounded w-full py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="technical">Technical</option>
                <option value="review">Review</option>
              </select>
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="remarks"
              >
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
              <button
                className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded mt-4"
                type="button"
              >
                Send Feedback
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

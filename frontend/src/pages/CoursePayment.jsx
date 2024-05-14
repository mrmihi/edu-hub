import React from "react";

export const CoursePayment = () => {
  const handlePaymentSubmit = (event) => {
    event.preventDefault();
    // Handle payment submission
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-semibold mb-4 ml-10">
        Proceed to payment...
      </h1>
      <div className="max-w-lg mx-auto bg-indigo-50 shadow-md rounded-lg overflow-hidden mt-6">
        <div className="p-4">
          <form onSubmit={handlePaymentSubmit} className="max-w-lg mx-auto">
            <div className="mb-4">
              <label
                htmlFor="amount"
                className="block text-sm font-medium text-gray-700"
              >
                Amount:
              </label>
              <input
                type="text"
                id="amount"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="cardNumber"
                className="block text-sm font-medium text-gray-700"
              >
                Card Number:
              </label>
              <input
                type="text"
                id="cardNumber"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="expiryDate"
                className="block text-sm font-medium text-gray-700"
              >
                Expiry Date:
              </label>
              <input
                type="text"
                id="expiryDate"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="csv"
                className="block text-sm font-medium text-gray-700"
              >
                CSV:
              </label>
              <input
                type="text"
                id="csv"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded mt-4"
            >
              Pay Now
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

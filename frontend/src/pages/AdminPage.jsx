import React, { useState } from 'react';
import { Course } from '../components/Course';
import { Feedback } from '../components/Feedback';
import { Schedule } from '../components/Schedule';
import { Instructor } from '../components/Instructor';
import { Payment } from '../components/Payment';
import { ReportPdf } from '../components/ReportPdf';

export const AdminPage = () => {
  const [activeTab, setActiveTab] = useState('Courses');

  const renderContent = () => {
    switch (activeTab) {
      case 'Courses':
        return <Course />;
      case 'Feedback':
        return <Feedback />;
      case 'Schedules':
        return <Schedule />;
      case 'Instructors':
        return <Instructor />;
      case 'Payment':
        return <Payment />;
      case 'Report':
        return <ReportPdf />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-4 bg-indigo-500 text-white text-center">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        </div>
        <div className="flex justify-around bg-indigo-100 p-4">
          <button className={`px-4 py-2 rounded ${activeTab === 'Courses' ? 'bg-indigo-500 text-white' : 'bg-white text-indigo-500'}`} onClick={() => setActiveTab('Courses')}>
            Courses
          </button>
          <button className={`px-4 py-2 rounded ${activeTab === 'Feedback' ? 'bg-indigo-500 text-white' : 'bg-white text-indigo-500'}`} onClick={() => setActiveTab('Feedback')}>
            Feedback
          </button>
          <button className={`px-4 py-2 rounded ${activeTab === 'Schedules' ? 'bg-indigo-500 text-white' : 'bg-white text-indigo-500'}`} onClick={() => setActiveTab('Schedules')}>
            Schedules
          </button>
          <button className={`px-4 py-2 rounded ${activeTab === 'Instructors' ? 'bg-indigo-500 text-white' : 'bg-white text-indigo-500'}`} onClick={() => setActiveTab('Instructors')}>
            Instructors
          </button>
          <button className={`px-4 py-2 rounded ${activeTab === 'Payment' ? 'bg-indigo-500 text-white' : 'bg-white text-indigo-500'}`} onClick={() => setActiveTab('Payment')}>
            Payment
          </button>
          <button className={`px-4 py-2 rounded ${activeTab === 'Report' ? 'bg-indigo-500 text-white' : 'bg-white text-indigo-500'}`} onClick={() => setActiveTab('Report')}>
            Report
          </button>
        </div>
        <div className="p-4">{renderContent()}</div>
      </div>
    </div>
  );
};

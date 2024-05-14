import React from 'react';

const ScheduledTable = () => {
  const scheduleData = [
    {
      name: 'Monday',
      slots: [
        { courseId: 'C1', courseName: 'Course 1', instructor: 'John Doe', startTime: '9:00 AM', endTime: '10:00 AM' },
        { courseId: 'C2', courseName: 'Course 2', instructor: 'Jane Smith', startTime: '10:00 AM', endTime: '11:00 AM' },
        { courseId: 'C3', courseName: 'Course 3', instructor: 'Alice Johnson', startTime: '11:00 AM', endTime: '12:00 PM' },
      ],
    },
    {
      name: 'Tuesday',
      slots: [
        { courseId: 'C4', courseName: 'Course 4', instructor: 'Bob Brown', startTime: '9:00 AM', endTime: '10:00 AM' },
        { courseId: 'C5', courseName: 'Course 5', instructor: 'Sarah Lee', startTime: '10:00 AM', endTime: '11:00 AM' },
      ],
    },
    {
      name: 'Wednesday',
      slots: [
        { courseId: 'C4', courseName: 'Course 4', instructor: 'Bob Brown', startTime: '9:00 AM', endTime: '10:00 AM' },
        { courseId: 'C5', courseName: 'Course 5', instructor: 'Sarah Lee', startTime: '10:00 AM', endTime: '11:00 AM' },
      ],
    },
    {
      name: 'Thursday',
      slots: [
        { courseId: 'C1', courseName: 'Course 1', instructor: 'John Doe', startTime: '9:00 AM', endTime: '10:00 AM' },
        { courseId: 'C2', courseName: 'Course 2', instructor: 'Jane Smith', startTime: '10:00 AM', endTime: '11:00 AM' },
        { courseId: 'C3', courseName: 'Course 3', instructor: 'Alice Johnson', startTime: '11:00 AM', endTime: '12:00 PM' },
      ],
    },
    {
      name: 'Friday',
      slots: [
        { courseId: 'C4', courseName: 'Course 4', instructor: 'Bob Brown', startTime: '9:00 AM', endTime: '10:00 AM' },
        { courseId: 'C5', courseName: 'Course 5', instructor: 'Sarah Lee', startTime: '10:00 AM', endTime: '11:00 AM' },
      ],
    },
    {
      name: 'Saturday',
      slots: [
        { courseId: 'C1', courseName: 'Course 1', instructor: 'John Doe', startTime: '9:00 AM', endTime: '10:00 AM' },
        { courseId: 'C2', courseName: 'Course 2', instructor: 'Jane Smith', startTime: '10:00 AM', endTime: '11:00 AM' },
        { courseId: 'C3', courseName: 'Course 3', instructor: 'Alice Johnson', startTime: '11:00 AM', endTime: '12:00 PM' },
      ],
    },
    {
      name: 'Sunday',
      slots: [
        { courseId: 'C4', courseName: 'Course 4', instructor: 'Bob Brown', startTime: '9:00 AM', endTime: '10:00 AM' },
        { courseId: 'C5', courseName: 'Course 5', instructor: 'Sarah Lee', startTime: '10:00 AM', endTime: '11:00 AM' },
      ],
    },
  ];

  return (
    <div className="flex justify-center">
      <div className="overflow-x-auto">
        <h1 className="text-3xl font-semibold mb-4">Schedule</h1>
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-indigo-500 text-white">
              {scheduleData.map((day, index) => (
                <th key={index} className="py-2 px-4">
                  {day.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-indigo-50">
            <tr>
              {scheduleData.map((day, index) => (
                <td key={index} className="border">
                  {day.slots.length > 0 ? (
                    <div>
                      {day.slots.slice(0, 5).map((slot, slotIndex) => (
                        <div key={slotIndex} className="border-b border-gray-300 hover:bg-indigo-500 px-6 py-4">
                          <div>{slot.courseId}</div>
                          <div>{slot.courseName}</div>
                          <div>{slot.instructor}</div>
                          <div>
                            {slot.startTime} - {slot.endTime}
                          </div>
                        </div>
                      ))}
                      {day.slots.length > 5 && <div>+ {day.slots.length - 5} more</div>}
                    </div>
                  ) : (
                    <div>No courses</div>
                  )}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ScheduledTable;

import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
// import { useAuth } from '../hooks';
// import {
//   Home,
//   Login,
//   Register,
//   Verify,
//   ForgotPassword,
//   ResetPassword,
//   Users,
//   Contact,
//   Dashboard,
//   Profile,
//   Orders,
//   Tickets,
//   TicketDetail,
//   Cart,
//   ProductForm,
//   ProductDetail,
//   NotFound,
//   Payment,
//   PaymentConfirmation,
// } from '../pages';
import { CourseEnroll } from '../pages/CourseEnroll';
import { Courses } from '../pages/Courses';
import CourseDetails from '../pages/CourseDetails';
import { CoursePayment } from '../pages/CoursePayment';
import { FeedbackForm } from '../pages/FeedbackForm';
import { Feedbacks } from '../pages/Feedbacks';
import ScheduledTable from '../pages/ScheduledTable';
import FeedbackAdmin from '../pages/FeedbackAdmin';
import { AdminPage } from '../pages/AdminPage';
import InstructorDashboard from '../pages/InstructorDashboard';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import ForgotPassword from '../pages/ForgotPassword';

const AnimatedRoutes = () => {
  // useAuth();

  const location = useLocation();

  return (
    <AnimatePresence>
      <Routes location={location}>
        <Route path="/" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/forgot-password" element={<ForgotPassword />}></Route>
        <Route path="/course-enroll" element={<CourseEnroll />}></Route>
        <Route path="/courses" element={<Courses />}></Route>
        <Route path="/course-details" element={<CourseDetails />}></Route>
        <Route path="/course-payment" element={<CoursePayment />}></Route>
        <Route path="/feedback-form" element={<FeedbackForm />}></Route>
        <Route path="/feedbacks" element={<Feedbacks />}></Route>
        <Route path="/feedback-admin" element={<FeedbackAdmin />}></Route>
        <Route path="/table" element={<ScheduledTable />}></Route>
        <Route path="/admin-panel" element={<AdminPage />}></Route>
        <Route path="/instructor-page" element={<InstructorDashboard />}></Route>
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;

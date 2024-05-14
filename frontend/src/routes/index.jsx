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

  const location = useLocation();

  return (
    <AnimatePresence>
      <Routes location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/users" element={<Users />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/payment-success" element={<PaymentConfirmation />} />
        <Route path="/product-add" element={<ProductForm />} />
        <Route path="/product-edit/:product_id" element={<ProductForm />} />
        <Route path="/product-detail/:product_id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/tickets" element={<Tickets />} />
        <Route path="/tickets/:ticket_id" element={<TicketDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;

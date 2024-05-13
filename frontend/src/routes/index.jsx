import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Home, Login, Register, Verify, ForgotPassword, ResetPassword, Users, Contact, Dashboard, Profile, Orders, Tickets, TicketDetail, Cart, ProductForm, ProductDetail, NotFound, Payment, PaymentConfirmation } from '../pages';

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
        <Route path="/course-add" element={<ProductForm />} />
        <Route path="/course-edit/:product_id" element={<ProductForm />} />
        <Route path="/course-detail/:course_id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/tickets" element={<Tickets />} />
        <Route path="/tickets/:ticket_id" element={<TicketDetail />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;

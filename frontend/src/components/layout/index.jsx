import { motion } from 'framer-motion';
import { ToastContainer } from 'react-toastify';
import { Loader } from '../common';
import Footer from './footer';
import Navbar from './navbar';
import { useAuth } from '../../hooks';

export const Layout = ({ children, hideHeader, hideFooter }) => {
  // useAuth();

  return (
    <motion.main
      className="bg-white font-inter overflow-x-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.3 } }}
      transition={{ duration: 0.3 }}
    >
      {!hideHeader && <Navbar />}
      <div class="w-screen min-h-screen relative z-[5]">{children}</div>
      {!hideFooter && <Footer />}
      <ToastContainer />
      <Loader />
    </motion.main>
  );
};

export default Layout;

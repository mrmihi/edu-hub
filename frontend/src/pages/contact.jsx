import { MailIcon, PhoneIcon, LocationMarkerIcon } from '@heroicons/react/solid';
import { Lottie } from '../components/common';
import Layout from '../components/layout';
import ContactEmail from '../../public/assets/animations/contact.json';

const Card = ({ icon: Icon, text }) => (
  <div class="w-full flex flex-col justify-center items-center gap-y-4 bg-primary-base rounded-lg text-white py-8 px-12 shadow-lg cursor-default hover:bg-primary-hover transition-all duration-300">
    <Icon className="w-12 h-12" />
    <span class="text-md font-bold">{text}</span>
  </div>
);

const Contact = () => {
  return (
    <Layout title="Contact">
      <div class="grid max-w-screen-2xl min-h-[85vh] grid-cols-1 gap-8 gap-x-12 px-8 py-12 mx-auto text-gray-900 md:grid-cols-2 md:px-12 lg:px-16 xl:px-24">
        <div class="flex flex-col justify-center">
          <div class="w-full mt-8">
            <Lottie animationData={ContactEmail} />
          </div>
        </div>
        <div class="flex flex-col justify-center gap-y-6">
          <div class="mb-2">
            <h2 class="text-4xl font-bold leading-tight lg:text-5xl">Contact Us</h2>
            <p class="mt-1 text-xl text-gray-700 text-semibold">We'd love to hear from you.</p>
          </div>
          <Card icon={MailIcon} text="arachnophobia@gmail.com" />
          <div class="w-full flex flex-col md:flex-row justify-center items-center gap-x-6 gap-y-6">
            <Card icon={PhoneIcon} text="+94127876678" />
            <Card icon={LocationMarkerIcon} text="Colombo, Sri Lanka" />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;

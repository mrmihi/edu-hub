import { Lottie } from '../../components/common';
import { default as Layout } from '../../components/layout';
import PaymentSuccessAnimation from '../../../public/assets/animations/payment-success.json';

const PaymentConfirmation = () => {
  return (
    <Layout title="Payments">
      <div class="w-screen min-h-screen flex flex-col justify-center items-center">
        <div class="text-5xl md:text-6xl font-semibold opacity-90 text-center px-6">Payment Successfull</div>
        <div class="text-xl md:text-2xl font-semibold opacity-90 mt-6 text-center px-6">Please check your email for the receipt</div>
        <div class="flex justify-center items-center">
          <div class="w-11/12 sm:w-7/12 lg:w-5/12 xl:w-4/12 mb-10">
            <Lottie animationData={PaymentSuccessAnimation} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PaymentConfirmation;

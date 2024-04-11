import { useNavigate } from 'react-router-dom';
import { Elements, useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { default as Layout } from '../../components/layout';
import { Button, Lottie } from '../../components/common';
import { makePayment, verifyPayment } from '../../services';
import toast from '../../libs/toastify';
import PaymentAnimation from '../../../public/assets/animations/payment.json';

const Payment = () => {
  const stripe = useStripe();
  const elements = useElements();

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const orderId = new URLSearchParams(window.location.search).get('order');
    await makePayment(orderId).then(async (data) => {
      if (data) {
        const { error: stripeError } = await stripe.confirmCardPayment(data?.data?.client_secret, {
          payment_method: {
            card: elements.getElement(CardNumberElement),
          },
          return_url: `${import.meta.env.VITE_FRONTEND_BASE_URL}/payment-success`,
        });
        if (stripeError) {
          return toast.error('Unable to process payment');
        }
        await verifyPayment(orderId).then((data) => {
          if (data) {
            if (!data.data.payment_status) {
              return toast.error('Unable to process payment');
            }
            localStorage.removeItem('cart');
            navigate('/payment-success');
          }
        });
      }
    });
  };

  return (
    <Layout title="Payments">
      <div class="w-screen min-h-[80vh] flex flex-col justify-center items-center px-6 md:px-24">
        <div class="flex justify-center items-center">
          <div class="w-11/12 sm:w-7/12 lg:w-5/12 xl:w-4/12 mb-10">
            <Lottie animationData={PaymentAnimation} />
          </div>
        </div>
        <form className="w-11/12 md:w-9/12 lg:w-7/12 xl:w-1/2 h-full" onSubmit={handleSubmit}>
          <div class="mb-3 font-semibold">Enter Card Details</div>
          <div className="w-full border-2 border-primary-base p-4 rounded-md">
            <CardNumberElement />
          </div>
          <div className="flex justify-center items-center mt-4 gap-x-2">
            <div className="w-full border-2 border-primary-base p-4 rounded-md">
              <CardExpiryElement />
            </div>
            <div className="w-full border-2 border-primary-base p-4 rounded-md">
              <CardCvcElement />
            </div>
          </div>
          <Button className="w-full py-4 mt-4" type="submit" disabled={!stripe || !elements}>
            Pay
          </Button>
        </form>
      </div>
    </Layout>
  );
};

export default function () {
  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISH_KEY);
  return (
    <Elements stripe={stripePromise}>
      <Payment />
    </Elements>
  );
}

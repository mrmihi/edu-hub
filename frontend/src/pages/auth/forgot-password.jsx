import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { forgotPassword } from '../../services/auth';
import { Button, Input, Lottie } from '../../components/common';
import { Layout } from '../../components/layout';
import Forgotten from '../../../public/assets/animations/forget-password.json';

const ForgotPassword = () => {
  const navigate = useNavigate();

  const handleForm = async (e) => {
    e.preventDefault();
    await forgotPassword({
      email: e.target.email.value,
    }).then((data) => {
      if (data) {
        toast.success('An email has been sent with a link to reset your password!', {
          autoClose: 2500,
        });
        setTimeout(() => {
          navigate('/login');
        }, 2500);
      }
    });
  };

  return (
    <Layout title="Reset Password">
      <div class="w-full min-h-screen flex flex-col items-center justify-center px-6 sm:px-16">
        <div class="h-[25vh] md:h-[30vh] mb-12">
          <Lottie animationData={Forgotten} />
        </div>
        <span class="text-black font-medium text-3xl tracking-[-0.04em]">Forgot Password?</span>
        <p class="text-black font-light tracking-tight text-center text-lg w-11/12 mt-8 mb-[47px] sm:w-full">
          Please enter your registration email address. We'll send instructions to help reset your password.
        </p>
        <form onSubmit={handleForm} class="w-full mb-40">
          <Input wrapperclasses="w-full" type="email" name="email" placeholder="Email" required />
          <Button type="submit" className="w-full px-12 py-4 mt-5">
            Send Code
          </Button>
        </form>
      </div>
    </Layout>
  );
};

export default ForgotPassword;

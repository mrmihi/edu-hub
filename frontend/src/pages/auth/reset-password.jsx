import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Button, Input, Lottie } from '../../components/common';
import { Layout } from '../../components/layout';
import { resetPassword } from '../../services/auth';
import Unlock from '../../../public/assets/animations/unlock.json';

const ResetPassword = () => {
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    await resetPassword(new URLSearchParams(window.location.search).get('code'), {
      new_password: e.target.password.value,
    }).then((data) => {
      if (data) {
        toast.success('Password reset successfully!', { autoClose: 2500 });
        setTimeout(() => {
          navigate('/login');
        }, 2500);
      }
    });
  };

  return (
    <Layout title="Reset Password">
      <div class="w-full min-h-screen flex flex-col items-center justify-center px-6 sm:px-16">
        <div class="h-[40vh] mb-12">
          <Lottie animationData={Unlock} />
        </div>
        <span class="text-black font-medium text-3xl tracking-[-0.04em] mb-8">Reset Your Password</span>
        <form onSubmit={handleReset} class="w-full mb-56">
          <Input wrapperclasses="w-full" placeholder="New Password" type="password" name="password" required />
          <Button type="submit" className="w-full px-12 py-4 mt-5">
            Reset Password
          </Button>
        </form>
      </div>
    </Layout>
  );
};

export default ResetPassword;

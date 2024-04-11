import { useNavigate } from 'react-router-dom';
import { useEffectOnce } from '../../hooks';
import { verify } from '../../services';

const Verify = () => {
  const navigateTo = useNavigate();

  useEffectOnce(() => {
    verify(new URLSearchParams(window.location.search).get('code'));
    navigateTo('/login');
  });

  return <></>;
};

export default Verify;

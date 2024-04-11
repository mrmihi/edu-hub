import ReactLottie from 'react-lottie';

const Lottie = ({ animationData }) => {
  const options = {
    animationData: animationData,
    loop: true,
    autoplay: true,
  };
  return <ReactLottie options={options} isClickToPauseDisabled={true} />;
};

export default Lottie;

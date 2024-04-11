import { twMerge } from 'tailwind-merge';

const Divider = ({ className = '' }) => {
  return <div class={twMerge(`w-full h-[0.75px] bg-gray-800 opacity-20 relative z-[2]`, className)} />;
};

export default Divider;

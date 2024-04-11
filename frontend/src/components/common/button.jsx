import { twMerge } from 'tailwind-merge';

const Button = ({ children, ...props }) => {
  return (
    <button
      {...props}
      className={twMerge(
        `${
          props.disabled ? 'bg-white/30' : 'bg-primary-base hover:bg-primary-hover text-white hover:text-white'
        } rounded-md flex items-center justify-center text-base font-normal transition duration-300`,
        props.className,
      )}
    >
      {children}
    </button>
  );
};

export default Button;

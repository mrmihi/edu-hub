import { CheckIcon } from '@heroicons/react/solid';

const Button = ({ checked, toggle, extraClasses }) => {
  return (
    <div
      class={`flex items-center justify-center cursor-pointer h-6 w-6 rounded shadow-ds2 border-2 border-gray-800 hover:bg-gray-900 transition duration-300 ${extraClasses} ${
        checked ? 'bg-gray-900' : 'bg-white'
      }`}
      onClick={toggle}
    >
      <CheckIcon className={`h-5 w-5 hover:text-white ${checked ? 'text-white' : 'text-gray-800'}`} />
    </div>
  );
};

export default Button;

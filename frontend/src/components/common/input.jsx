import { twMerge } from 'tailwind-merge';

const Text = (props) => <input {...props} />;

const TextArea = (props) => <textarea {...props} />;

const Input = ({ placeholder, type, required, prefixIcon, value, label, textarea, ...props }) => {
  const Element = textarea ? TextArea : Text;
  return (
    <div class={twMerge('relative my-2 group', props.wrapperclasses || '')}>
      {prefixIcon && (
        <div class="h-full w-10 group-hover:w-12 py-3.5 absolute left-0 rounded-l-md border-r-1 border-black flex justify-center items-center bg-gray-900 cursor-pointer transition-all duration-300">
          <div class="w-5 h-5 text-white">{prefixIcon}</div>
        </div>
      )}
      {label && <div class="mb-3 font-semibold">{placeholder}</div>}
      <Element
        {...props}
        type={type || 'text'}
        className={twMerge(
          `w-full shadow-ds2 pr-4 py-3.5 ${
            prefixIcon ? 'pl-14 group-hover:pl-16' : 'pl-4'
          } text-sm font-semibold bg-transparent border-2 text-gray-800 border-gray-400 focus:border-gray-900 focus:ring-0 outline-none focus:ring-offset-0 rounded-md transition-all duration-300`,
          props.className,
        )}
        placeholder={placeholder}
        required={required || false}
        value={value}
      />
    </div>
  );
};

export default Input;

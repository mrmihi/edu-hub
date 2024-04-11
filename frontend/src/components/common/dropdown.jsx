import { v4 as uuidv4 } from 'uuid';
import { useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { twMerge } from 'tailwind-merge';

const wrapperId = uuidv4();
const inputId = uuidv4();

const Dropdown = ({ options, onChange, label, ...props }) => {
  const [selectedOption, setSelectedOption] = useState(props.default || null);

  const [showItems, setShowItems] = useState(false);

  const id = props.id || inputId;

  const clickListener = (e) => {
    if (e.target.id !== id && e.target.id !== wrapperId) {
      setShowItems(false);
    }
  };

  useEffect(() => {
    document.removeEventListener('click', clickListener);
    document.addEventListener('click', clickListener);
  });

  const onSelect = (option) => {
    onChange(
      {
        target: {
          id,
          value: option?.key,
        },
      },
      props.filterkey,
    );
    setSelectedOption(option?.key);
  };

  return (
    <div id={wrapperId} class={`${props.wrapperclasses || ''} w-full relative`}>
      {label && <div class="mb-3 font-semibold">{label}</div>}
      <input
        id={id}
        class={twMerge(
          `w-full shadow-ds2 pr-4 py-2.5 lg:py-3.5 pl-4 text-sm font-semibold bg-transparent border-2 text-gray-800 border-gray-400 focus:border-gray-900 focus:ring-0 focus:ring-offset-0 rounded-md cursor-pointer transition-all duration-300`,
          props.className,
        )}
        value={options.find((opt) => opt.key === selectedOption)?.label || 'Select'}
        onClick={() => {
          setShowItems(!showItems);
        }}
        onChange={() => {}}
      />
      {showItems && (
        <div
          class="absolute w-full left-0 z-10 mt-2 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex="-1"
        >
          <div class="py-1" role="none">
            {options.map((option, index) => {
              return (
                <div
                  key={`${option.key}-${index}`}
                  class="text-gray-700 block px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 hover:text-gray-900"
                  role="menuitem"
                  tabIndex="-1"
                  id="menu-item-0"
                  onClick={() => {
                    onSelect(option);
                  }}
                >
                  {option.label}
                </div>
              );
            })}
          </div>
        </div>
      )}
      {selectedOption && (
        <div
          class={`w-fit h-full absolute right-3 ${label ? 'top-4' : 'top-0'} flex justify-center items-center ${
            props.className.includes('hidden') || props.className.includes('opacity-0') ? 'hidden opacity-0' : ''
          }`}
        >
          <AiOutlineClose className="w-[1.2rem] h-[1.2rem] text-gray-700 cursor-pointer" onClick={onSelect} />
        </div>
      )}
    </div>
  );
};

export default Dropdown;

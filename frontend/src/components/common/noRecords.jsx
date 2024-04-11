import { twMerge } from 'tailwind-merge';

export const NoRecords = ({ text = 'No Records Found', ...props }) => {
  return (
    <div class={twMerge(`w-full h-full flex justify-center items-center`, props.className)}>
      <span class="text-3xl font-semibold">{text}</span>
    </div>
  );
};

export default NoRecords;

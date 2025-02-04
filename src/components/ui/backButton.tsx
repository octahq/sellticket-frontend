'use client';

import { BiArrowBack } from 'react-icons/bi';
import { useRouter } from 'next/navigation';

const BackButton = () => {
  const router = useRouter();
  return (
    <>
      <button className=" text-xl  ml-0" onClick={() => router.back()}>
        <BiArrowBack className="text-2xl" />{' '}
      </button>
    </>
  );
};
export default BackButton;

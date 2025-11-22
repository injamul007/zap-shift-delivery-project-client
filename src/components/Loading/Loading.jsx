import React from 'react';
import { ClipLoader } from 'react-spinners';

const Loading = () => {
  return (
    <div className='flex justify-center items-center min-h-[46vh]'>
      <p className='text-3xl font-bold'>L <ClipLoader /> A D I N G</p>
    </div>
  );
};

export default Loading;
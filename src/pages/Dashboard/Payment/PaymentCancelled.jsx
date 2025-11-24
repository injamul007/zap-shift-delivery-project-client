import React from 'react';
import { Link } from 'react-router';

const PaymentCancelled = () => {
  return (
    <div className='flex justify-center items-center flex-col space-y-3 min-h-2/4'>
      <h2 className='text-4xl'>Payment is Cancelled. Please try again</h2>
      <Link to={'/dashboard/my-parcels'}><button className='btn btn-primary text-secondary'>Try Again</button></Link>
    </div>
  );
};

export default PaymentCancelled;
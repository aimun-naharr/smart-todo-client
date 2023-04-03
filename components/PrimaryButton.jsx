import React from 'react';
import Loader from './Loader';

const PrimaryButton = ({label, type='submit', loading}) => {
    return (
       <button type={type} className='w-full bg-slate-700 text-white py-3 rounded-md uppercase font-semibold'>{loading? <Loader/>: label}</button>
    );
};

export default PrimaryButton;
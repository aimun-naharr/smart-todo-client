import React from 'react';
import {BiEdit} from 'react-icons/bi'
import {MdDelete} from 'react-icons/md'

const Task = ({task}) => {
   const formatDate=new Date(task.dueDate).toLocaleDateString('en-ca')
 
    return (
        <div className='w-96 bg-white shadow-md px-4 rounded-md py-5 text-gray-600'>
            <div className='flex justify-between items-center border-b-2'>
                <h4 className='text-xl font-semibold text-gray-700'>{task.title}</h4>
                <BiEdit/>
            </div>
            <div className='mt-2'>{task.description}</div>
            <div className='flex items-center justify-between'>
                <span>{formatDate}</span>
                <MdDelete/>
            </div>
        </div>
    );
};

export default Task;
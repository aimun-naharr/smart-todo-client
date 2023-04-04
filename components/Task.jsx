import { deleteTask } from '@/apiRoute';
import axios from 'axios';
import React, { useState } from 'react';
import {BiEdit} from 'react-icons/bi'
import {MdDelete} from 'react-icons/md'
import Loader from './Loader';
import useUpdateTaskModal from './hooks/useUpdateTaskModal';

const Task = ({task}) => {
    const updateTaskModal=useUpdateTaskModal()
   const formatDate=new Date(task.dueDate).toLocaleDateString('en-ca')
   const [isLoading,setIsLoading]=useState(false)
   const handleDelete=(id)=>{
    setIsLoading(true)
axios.delete(`${deleteTask}/${id}`)
.then(data=>console.log(data))
.catch(err=>console.log(err))
.finally(()=>setIsLoading(false))
   }
 
    return (
        <div className='w-96 bg-white shadow-md px-4 rounded-md py-5 text-gray-600'>
            <div className='flex justify-between items-center border-b-2'>
                <h4 className='text-xl font-semibold text-gray-700'>{task.title}</h4>
                <BiEdit className='cursor-pointer' onClick={()=>updateTaskModal.onOpen(task._id)}/>
            </div>
            <div className='mt-2'>{task.description}</div>
            <div className='flex items-center justify-between'>
                <span>{formatDate}</span>
                {isLoading? <Loader/>: <MdDelete onClick={()=>{handleDelete(task._id)}} className='cursor-pointer'/>}
            </div>
        </div>
    );
};

export default Task;
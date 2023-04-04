import { deleteTask } from '@/apiRoute';
import axios from 'axios';
import React, { useState } from 'react';
import {BiEdit} from 'react-icons/bi'
import {MdDelete} from 'react-icons/md'
import Loader from './Loader';
import useUpdateTaskModal from './hooks/useUpdateTaskModal';
import useTasks from './hooks/useTasks';

const Task = ({task}) => {
    const updateTaskModal=useUpdateTaskModal()
    const setCurrentTask=useUpdateTaskModal(state=>state.setCurrentTask)
   const formatDate=new Date(task.dueDate).toLocaleDateString('en-ca')
   const setTasks = useTasks((state) => state.setTasksData);
   const tasks = useTasks((state) => state.tasksData);
   const [isLoading,setIsLoading]=useState(false)
   const handleDelete=(id)=>{
    setIsLoading(true)
axios.delete(`${deleteTask}/${id}`)
.then(data=>{
    console.log(data)
    const newData=tasks.filter(task=>task._id !== data.data._id)
    setTasks(newData)
})
.catch(err=>console.log(err))
.finally(()=>setIsLoading(false))
   }
 const handleUpdate=(data)=>{
    updateTaskModal.onOpen(data._id)
    setCurrentTask(data)
 }
    return (
        <div className='w-96 bg-white shadow-md px-4 rounded-md py-5 text-gray-600'>
            <div className='flex justify-between items-center border-b-2'>
                <h4 className='text-xl font-semibold text-gray-700'>{task.title}</h4>
                <BiEdit className='cursor-pointer' onClick={()=>handleUpdate(task)}/>
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
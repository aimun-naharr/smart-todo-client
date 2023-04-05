import { deleteTask } from '@/apiRoute';
import axios from 'axios';
import React, { useState } from 'react';
import {BiEdit} from 'react-icons/bi'
import {MdDelete} from 'react-icons/md'
import Loader from './Loader';
import useUpdateTaskModal from './hooks/useUpdateTaskModal';
import useTasks from './hooks/useTasks';
import useShowTaskModal from './hooks/useShowTaskModal';

const Task = ({task}) => {
    const updateTaskModal=useUpdateTaskModal()
    const setCurrentTask=useUpdateTaskModal(state=>state.setCurrentTask)
    const setId=useUpdateTaskModal(state=>state.setId)
   const formatDate=new Date(task.dueDate).toLocaleDateString('en-ca')
   const setTasks = useTasks((state) => state.setTasksData);
   const tasks = useTasks((state) => state.tasksData);
   const [isLoading,setIsLoading]=useState(false)
   const open = useShowTaskModal(state=>state.onOpen);
   const close = useShowTaskModal(state=>state.onClose);
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
 const showTask=(data)=>{
    setId(data._id)
    setCurrentTask(data)
    open()
 }
    return (
        <div  className='w-80 col-span-1 bg-white shadow-md  rounded-md text-gray-600 cursor-pointer hover:scale-105 transition transform duration-200 ease-out'>
            <div className='flex justify-between items-center border-b-4 border-cyan-200/70 bg-slate-800 px-4 rounded-md'>
                <h4 className='text-xl font-semibold text-gray-300 py-2 '>{task.title}</h4>
                <BiEdit className='cursor-pointer text-2xl text-cyan-400' onClick={()=>handleUpdate(task)}/>
            </div>
            <div onClick={()=>showTask(task)} className='mt-2 min-h-8 border-b-2 border-cyan-100 py-1 px-4'>{task.description}</div>
            <div className='flex items-center justify-between py-3 px-4'>
                <span className='text-sm'>{formatDate}</span>
                {isLoading? <Loader/>: <MdDelete  onClick={()=>{handleDelete(task._id)}} className='cursor-pointer text-rose-500 text-xl'/>}
            </div>
        </div>
    );
};

export default Task;
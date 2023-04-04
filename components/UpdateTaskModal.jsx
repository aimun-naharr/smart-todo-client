import React, { useEffect, useState } from 'react';
import Modal from './Modal';
import { useForm } from 'react-hook-form';
import useUpdateTaskModal from './hooks/useUpdateTaskModal';
import Input from './Input';
import { updateTaskById } from '@/apiRoute';
import axios from 'axios';

const UpdateTaskModal = ({tasks}) => {
    const updateTask=useUpdateTaskModal()
    const currentTask=tasks?.find(task=>task._id ===updateTask.updatedId)
    console.log(currentTask)
    
    
    const [isLoading, setIsLoading] = useState(false);
    const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({defaultValues: {
       title: currentTask?.title,
       description: currentTask?.description,
       dueDate: currentTask?.dueDate
    }});
    let currentDate = new Date().toLocaleDateString('en-ca');
    const onSubmit = (data) => {
		setIsLoading(true);
		axios.patch(`${updateTaskById}/${currentTask._id}`, data)
			.then((data) => {
				console.log(data)
				updateTask.onClose()})
			.catch((err) => console.log(err))
			.finally(() =>{ 
				reset()
				setIsLoading(false)});
	};
    const bodyContent = (
		<form className="flex flex-col gap-4">
			<div className="flex gap-4">
				<Input register={register} id="title" label="Title" errors={errors} required />
				<Input register={register} id="dueDate" label="Due Date" errors={errors} required type="date" min={currentDate} />
			</div>
			<div>
				<Input register={register} id="description" label="Description" errors={errors} required />
			</div>
		</form>)
    return (
        <Modal title="Edit your task" onClose={updateTask.onClose} isOpen={updateTask.isOpen} disabled={isLoading} actionLabel="Save" onSubmit={handleSubmit(onSubmit)} body={bodyContent} loading={isLoading}/>
    );
};

export default UpdateTaskModal;
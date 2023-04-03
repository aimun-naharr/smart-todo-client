import React, { useEffect, useState } from "react";
import useAddTaskModal from "./hooks/useAddTaskModal";
import Modal from "./Modal";
import { useForm } from "react-hook-form";
import Input from "./Input";
import { addNewTask } from "@/apiRoute";
import axios from "axios";

const AddTaskModal = () => {
	const addTaskModal = useAddTaskModal();
	const [isLoading, setIsLoading] = useState(false);
	const [userData, setUserData]=useState({})

	
    let currentDate = new Date().toLocaleDateString('en-ca');
	useEffect(()=>{
		const user=JSON.parse(localStorage.getItem('todo-user'))
		setUserData(user)
	},[])
 
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();
	const onSubmit = (data) => {
		setIsLoading(true);
		axios.post(addNewTask, {...data, creator: userData._id})
			.then((data) => {
				console.log(data)
				addTaskModal.onClose()})
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
		</form>
	);

	return <Modal title="Add a task" onClose={addTaskModal.onClose} isOpen={addTaskModal.isOpen} disabled={isLoading} actionLabel="Save" onSubmit={handleSubmit(onSubmit)} body={bodyContent} loading={isLoading}/>;
};

export default AddTaskModal;

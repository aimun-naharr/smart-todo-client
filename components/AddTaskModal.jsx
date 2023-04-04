import React, { useEffect, useState } from "react";
import useAddTaskModal from "./hooks/useAddTaskModal";
import Modal from "./Modal";
import { useForm } from "react-hook-form";
import Input from "./Input";
import { addNewTask } from "@/apiRoute";
import axios from "axios";
import useTasks from "./hooks/useTasks";


const AddTaskModal = () => {
	const addTaskModalClose = useAddTaskModal(state=>state.onClose);
	const addTaskModalOpen = useAddTaskModal(state=>state.onOpen);
	const isOpen = useAddTaskModal(state=>state.isOpen);
	const [isLoading, setIsLoading] = useState(false);
	const [userData, setUserData]=useState({})
	const addTasks = useTasks((state) => state.addTaskData);
	const tasks = useTasks((state) => state.tasksData);
	console.log(tasks)
	
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
				addTasks([...tasks, data.data])
				})
			.catch((err) => console.log(err))
			.finally(() =>{ 
				reset()
				setIsLoading(false)
				addTaskModalClose()});
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

	return <Modal title="Add a task" onClose={addTaskModalClose} isOpen={isOpen} disabled={isLoading} actionLabel="Save" onSubmit={handleSubmit(onSubmit)} body={bodyContent} loading={isLoading}/>;
};

export default AddTaskModal;
